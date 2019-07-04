import React, {Component} from 'react';
import axios from 'axios/index';
import './VideoRoomComponent.css';
import {OpenVidu} from 'openvidu-browser';
import StreamComponent from '../stream/StreamComponent';
import ChatComponent from '../chat/ChatComponent';

import OpenViduLayout from '../../layout/openvidu-layout';
import UserModel from '../../models/user-model';
import ToolbarComponent from '../toolbar/ToolbarComponent';
import { CheckList } from "../check/checklist";


var localUser = new UserModel();

class VideoRoomComponent extends Component {
  constructor(props) {
    super(props);
    if(!this.props.isLoggedIn){
      //no login for worker for now
      if(!this.props.isWorker){
        this.props.history.push('/login')
      }
    }
    this.OPENVIDU_SERVER_URL = this.props.openviduServerUrl
      ? this.props.openviduServerUrl
      : 'https://' + window.location.hostname + ':4443';
    this.OPENVIDU_SERVER_SECRET = this.props.openviduSecret ? this.props.openviduSecret : 'MY_SECRET';
    this.hasBeenUpdated = false;
    this.layout = new OpenViduLayout();
    let sessionName = this.props.sessionName ? this.props.sessionName : 'SessionA';
    let userName = this.props.user ? this.props.user : 'OpenVidu_User' + Math.floor(Math.random() * 100);
    this.state = {
      mySessionId: sessionName,
      myUserName: userName,
      session: undefined,
      localUser: undefined,
      subscribers: [],
      chatDisplay: 'none',
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.updateLayout = this.updateLayout.bind(this);
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.nicknameChanged = this.nicknameChanged.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
    this.checkNotification = this.checkNotification.bind(this);
    this.checkSize = this.checkSize.bind(this);
  }

  componentDidMount() {
    const openViduLayoutOptions = {
      maxRatio: 3 / 2, // The narrowest ratio that will be used (default 2x3)
      minRatio: 9 / 16, // The widest ratio that will be used (default 16x9)
      fixedRatio: false, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
      bigClass: 'OV_big', // The class to add to elements that should be sized bigger
      bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
      bigFixedRatio: false, // fixedRatio for the big ones
      bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
      bigMinRatio: 9 / 16, // The widest ratio to use for the big elements (default 16x9)
      bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
      animate: true, // Whether you want to animate the transitions
    };

    this.layout.initLayoutContainer(document.getElementById('layout'), openViduLayoutOptions);
    window.addEventListener('beforeunload', this.onbeforeunload);
    window.addEventListener('resize', this.updateLayout);
    window.addEventListener('resize', this.checkSize);
    this.joinSession();
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onbeforeunload);
    window.removeEventListener('resize', this.updateLayout);
    window.removeEventListener('resize', this.checkSize);
    this.leaveSession();
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  joinSession() {
    this.OV = new OpenVidu();

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        this.subscribeToStreamCreated();

        this.connectToSession();
      },
    );
  }

  connectToSession() {
    if (this.props.token !== undefined) {
      console.log('token received: ', this.props.token);
      this.connect(this.props.token);
    } else {
      this.getToken().then((token) => {
        console.log(token);
        this.connect(token);
      }).catch((error) => {
        if (this.props.error) {
          this.props.error({error: error.error, messgae: error.message, code: error.code, status: error.status});
        }
        console.log('There was an error getting the token:', error.code, error.message);
        alert('There was an error getting the token:', error.message);
      });
    }
  }

  connect(token) {
    this.state.session
      .connect(
        token,
        {clientData: this.state.myUserName},
      )
      .then(() => {
        this.connectWebCam();
      })
      .catch((error) => {
        if (this.props.error) {
          this.props.error({error: error.error, messgae: error.message, code: error.code, status: error.status});
        }
        alert('There was an error connecting to the session:', error.message);
        console.log('There was an error connecting to the session:', error.code, error.message);
      });
  }

  connectWebCam() {
    const publisherWorker = this.OV.initPublisher(undefined, {
        audioSource: undefined,
        videoSource: undefined,
        publishAudio: true,
        publishVideo: localUser.isVideoActive(),
        resolution: '1280x720',
        frameRate: 30,
        insertMode: 'REPLACE',
      });
    const publisherExpert = this.OV.initPublisher(undefined, {
      audioSource: undefined,
      videoSource: false,
      publishAudio: true,
      publishVideo: false
    });


    if (this.state.session.capabilities.publish) {
      if (this.props.isWorker) {
        this.state.session.publish(publisherWorker).then(() => {
          if (this.props.joinSession) {
            this.props.joinSession();
          }
        });
      } else {
        this.state.session.publish(publisherExpert).then(() => {
          if (this.props.joinSession) {
            this.props.joinSession();
          }
        });
      }
    }
    localUser.setNickname(this.state.myUserName);
    localUser.setConnectionId(this.state.session.connection.connectionId);
    if (this.props.isWorker){
      localUser.setStreamManager(publisherWorker);
    } else {
      localUser.setStreamManager(publisherExpert);
    }

    this.subscribeToUserChanged();
    this.subscribeToStreamDestroyed();
    this.sendSignalUserChanged({isScreenShareActive: localUser.isScreenShareActive()});

    this.setState({localUser: localUser}, () => {
      this.state.localUser.getStreamManager().on('streamPlaying', (e) => {
        this.updateLayout();
        publisherWorker.videos[0].video.parentElement.classList.remove('custom-class');
      });
    });
  }

  leaveSession() {
    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: 'SessionA',
      myUserName: 'OpenVidu_User' + Math.floor(Math.random() * 100),
      localUser: undefined,
    });
    if (this.props.leaveSession) {
      this.props.leaveSession();
    }
    this.props.history.push('/login')
  }

  camStatusChanged() {
    localUser.setVideoActive(!localUser.isVideoActive());
    localUser.getStreamManager().publishVideo(localUser.isVideoActive());
    this.sendSignalUserChanged({isVideoActive: localUser.isVideoActive()});
    this.setState({localUser: localUser});
  }

  micStatusChanged() {
    localUser.setAudioActive(!localUser.isAudioActive());
    localUser.getStreamManager().publishAudio(localUser.isAudioActive());
    this.sendSignalUserChanged({isAudioActive: localUser.isAudioActive()});
    this.setState({localUser: localUser});
  }

  nicknameChanged(nickname) {
    let localUser = this.state.localUser;
    localUser.setNickname(nickname);
    this.setState({localUser: localUser});
    this.sendSignalUserChanged({nickname: this.state.localUser.getNickname()});
  }

  deleteSubscriber(stream) {
    const remoteUsers = this.state.subscribers;
    const userStream = remoteUsers.filter((user) => user.getStreamManager().stream === stream)[0];
    let index = remoteUsers.indexOf(userStream, 0);
    if (index > -1) {
      remoteUsers.splice(index, 1);
      this.setState({
        subscribers: remoteUsers,
      });
    }
  }

  subscribeToStreamCreated() {
    this.state.session.on('streamCreated', (event) => {
      const subscriber = this.state.session.subscribe(event.stream, undefined);
      let subscribers = this.state.subscribers;
      subscriber.on('streamPlaying', (e) => {
        subscriber.videos[0].video.parentElement.classList.remove('custom-class');
      });
      const newUser = new UserModel();
      newUser.setStreamManager(subscriber);
      newUser.setConnectionId(event.stream.connection.connectionId);
      newUser.setType('remote');
      const nickname = event.stream.connection.data.split('%')[0];
      newUser.setNickname(JSON.parse(nickname).clientData);
      subscribers.push(newUser);
      this.setState(
        {
          subscribers: subscribers,
        },
        () => {
          if (this.state.localUser) {
            this.sendSignalUserChanged({
              isAudioActive: this.state.localUser.isAudioActive(),
              isVideoActive: this.state.localUser.isVideoActive(),
              nickname: this.state.localUser.getNickname(),
            });
          }
          this.updateLayout();
        },
      );
    });
  }

  subscribeToStreamDestroyed() {
    // On every Stream destroyed...
    this.state.session.on('streamDestroyed', (event) => {
      // Remove the stream from 'subscribers' array
      this.deleteSubscriber(event.stream);
      event.preventDefault();
      this.updateLayout();
    });
  }

  subscribeToUserChanged() {
    this.state.session.on('signal:userChanged', (event) => {
      let remoteUsers = this.state.subscribers;
      remoteUsers.forEach((user) => {
        if (user.getConnectionId() === event.from.connectionId) {
          const data = JSON.parse(event.data);
          console.log('EVENTO REMOTE: ', event.data);
          if (data.isAudioActive !== undefined) {
            user.setAudioActive(data.isAudioActive);
          }
          if (data.isVideoActive !== undefined) {
            user.setVideoActive(data.isVideoActive);
          }
          if (data.nickname !== undefined) {
            user.setNickname(data.nickname);
          }
        }
      });
      this.setState(
        {
          subscribers: remoteUsers,
        }
      );
    });
  }

  updateLayout() {
    setTimeout(() => {
      this.layout.updateLayout();
    }, 20);
  }

  sendSignalUserChanged(data) {
    const signalOptions = {
      data: JSON.stringify(data),
      type: 'userChanged',
    };
    this.state.session.signal(signalOptions);
  }


  toggleChat(property) {
    let display = property;

    if (display === undefined) {
      display = this.state.chatDisplay === 'none' ? 'block' : 'none';
    }
    if (display === 'block') {
      this.setState({chatDisplay: display, messageReceived: false});
    } else {
      console.log('chat', display);
      this.setState({chatDisplay: display});
    }
    this.updateLayout();
  }

  checkNotification(event) {
    this.setState({
      messageReceived: this.state.chatDisplay === 'none',
    });
  }

  checkSize() {
    if (document.getElementById('layout').offsetWidth <= 700 && !this.hasBeenUpdated) {
      this.toggleChat('none');
      this.hasBeenUpdated = true;
    }
    if (document.getElementById('layout').offsetWidth > 700 && this.hasBeenUpdated) {
      this.hasBeenUpdated = false;
    }
  }

  render() {
    const localUser = this.state.localUser;
    var chatDisplay = {display: this.state.chatDisplay};

    return (
      <div className="container" id="container">
        {localUser !== undefined && localUser.getStreamManager() !== undefined &&(
          <CheckList user={localUser}/>
        )}

        <div id="layout" className="bounds">
          {this.state.subscribers.map((sub, i) => (
            <div key={i} className="OT_root OT_publisher custom-class" id="remoteUsers">
              <StreamComponent user={sub} streamId={sub.streamManager.stream.streamId}/>
            </div>
          ))}
          {localUser !== undefined && localUser.getStreamManager() !== undefined && (
            <div className="OT_root OT_publisher custom-class" style={chatDisplay}>
              <ChatComponent
                user={localUser}
                chatDisplay={this.state.chatDisplay}
                close={this.toggleChat}
                messageReceived={this.checkNotification}
              />
            </div>
          )}
        </div>
        <ToolbarComponent
          showNotification={this.state.messageReceived}
          leaveSession={this.leaveSession}
          toggleChat={this.toggleChat}
          numUsers={this.state.subscribers.length}
        />
      </div>
    );
  }

  /**
   * --------------------------
   * SERVER-SIDE RESPONSIBILITY
   * --------------------------
   * These methods retrieve the mandatory user token from OpenVidu Server.
   * This behaviour MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
   * the API REST, openvidu-java-client or openvidu-node-client):
   *   1) Initialize a session in OpenVidu Server  (POST /api/sessions)
   *   2) Generate a token in OpenVidu Server    (POST /api/tokens)
   *   3) The token must be consumed in Session.connect() method
   */

  getToken() {
    return this.createSession(this.state.mySessionId).then((sessionId) => this.createToken(sessionId));
  }

  createSession(sessionId) {
    return new Promise((resolve, reject) => {
      let data = JSON.stringify({customSessionId: sessionId});
      axios
        .post(this.OPENVIDU_SERVER_URL + '/api/sessions', data, {
          headers: {
            Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + this.OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('CREATE SESION', response);
          resolve(response.data.id);
        })
        .catch((response) => {
          let error = Object.assign({}, response);
          if (error.response && error.response.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              'No connection to OpenVidu Server. This may be a certificate error at ' + this.OPENVIDU_SERVER_URL,
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                this.OPENVIDU_SERVER_URL +
                '"\n\nClick OK to navigate and accept it. ' +
                'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                this.OPENVIDU_SERVER_URL +
                '"',
              )
            ) {
              window.location.assign(this.OPENVIDU_SERVER_URL + '/accept-certificate');
            }
          }
        });
    });
  }

  createToken(sessionId) {
    return new Promise((resolve, reject) => {
      let data = JSON.stringify({session: sessionId});
      axios
        .post(this.OPENVIDU_SERVER_URL + '/api/tokens', data, {
          headers: {
            Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + this.OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('TOKEN', response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  }
}
export default VideoRoomComponent;
