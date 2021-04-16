import React, {useState, useRef, useEffect} from 'react';
import './ChatComponent.css';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import HighlightOff from '@material-ui/icons/HighlightOff';
import Send from '@material-ui/icons/Send';
import { Tooltip } from '@material-ui/core';
import PropTypes from 'prop-types';

function ChatComponent(props) {
    const {user, chatDisplay, close: closeCallback, messageReceived: messageReceivedCallback } = props;
    const [messageList, setMessageList] = useState([]);
    const [message, setMessage] = useState('');
    const styleChat = { display: chatDisplay };
    const chatScroll = useRef();

    useEffect(function () {
        const chatListener = async (event) => {
            const data = JSON.parse(event.data);
            await setMessageList(messageList.concat({ connectionId: event.from.connectionId, nickname: data.nickname, message: data.message }))
            // const document = window.document;
            // setTimeout(() => {
            //     const userImg = document.getElementById('userImg-' + (messageList.length - 1));
            //     const video = document.getElementById('video-' + data.streamId);
            //     const avatar = userImg.getContext('2d');
            //     avatar.drawImage(video, 200, 120, 285, 285, 0, 0, 60, 60);
            // }, 50);
            messageReceivedCallback();
            scrollToBottom();
        }
        user.getStreamManager().stream.session.on('signal:chat', chatListener);
    }, []);

    const handleChange = function (event) {
        setMessage(event.target.value);
    }

    const handlePressKey = function (event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    }

    const sendMessage = function () {
        console.log(message);
        if (user && message) {
            let currentMessage = message.replace(/ +(?= )/g, '');
            if (currentMessage !== '' && currentMessage !== ' ') {
                const data = { message: currentMessage, nickname: user.getNickname(), streamId: user.getStreamManager().stream.streamId };
                user.getStreamManager().stream.session.signal({
                    data: JSON.stringify(data),
                    type: 'chat',
                });
            }
        }
        setMessage('');
    }

    const scrollToBottom = function () {
        setTimeout(() => {
            try {
                chatScroll.current.scrollTop = chatScroll.current.scrollHeight;
            } catch (err) {}
        }, 20);
    }

    const close = function () {
        closeCallback(undefined);
    }

    return (
      <div id="chatContainer">
          <div id="chatComponent" style={styleChat}>
              <div id="chatToolbar">
                  {user && user.getStreamManager() && (
                    <span>{user.getStreamManager().stream.session.sessionId} - CHAT</span>
                  )}
                  <IconButton id="closeButton" onClick={close}>
                      <HighlightOff color="secondary" />
                  </IconButton>
              </div>
              <div className="message-wrap" ref={chatScroll}>
                  {messageList.map((data, i) => (
                    <div
                      key={i}
                      id="remoteUsers"
                      className={
                          'message' + (data.connectionId !== user.getConnectionId() ? ' left' : ' right')
                      }
                    >
                        <canvas id={'userImg-' + i} width="60" height="60" className="user-img" />
                        <div className="msg-detail">
                            <div className="msg-info">
                                <p> {data.nickname}</p>
                            </div>
                            <div className="msg-content">
                                <span className="triangle" />
                                <p className="text">{data.message}</p>
                            </div>
                        </div>
                    </div>
                  ))}
              </div>

              <div id="messageInput">
                  <input
                    placeholder="Send a message"
                    id="chatInput"
                    value={message}
                    onChange={handleChange}
                    onKeyPress={handlePressKey}
                  />
                  <Tooltip title="Send message">
                      <Fab size="small" id="sendButton" onClick={sendMessage}>
                          <Send />
                      </Fab>
                  </Tooltip>
              </div>
          </div>
      </div>
    );
}

ChatComponent.propTyepes = {
    user: PropTypes.object.isRequired,
    chatDisplay: PropTypes.bool.isRequired,
    close: PropTypes.func,
    messageReceivedCallback: PropTypes.func,
}

export default ChatComponent;
