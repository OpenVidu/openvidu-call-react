import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import VideoRoomComponent from './components/VideoRoomComponent';

function Index() {
  const OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443';
  const OPENVIDU_SERVER_SECRET = 'MY_SECRET';
  const sessionName = 'SessionA';
  let user = 'OpenVidu_User' + Math.floor(Math.random() * 100);
  const [token, setToken] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await getToken();
      console.log(`Got token as ${result}`);
      setToken(result);
    })();
  }, []);

  /**
   * --------------------------
   * SERVER-SIDE RESPONSIBILITY
   * --------------------------
   * These methods retrieve the mandatory user token from OpenVidu Server.
   * This behaviour MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
   * the API REST, openvidu-java-client or openvidu-node-client):
   *   1) Initialize a session in OpenVidu Server	(POST /api/sessions)
   *   2) Generate a token in OpenVidu Server		(POST /api/tokens)
   *   3) The token must be consumed in Session.connect() method
   */

  const getToken = async function () {
    const sessionId = await createSession(sessionName);
    return await createToken(sessionId);
  };

  const createSession = async function (sessionId) {
    try {
      let data = JSON.stringify({ customSessionId: sessionId });
      const response = await axios.post(
        OPENVIDU_SERVER_URL + '/openvidu/api/sessions',
        data,
        {
          headers: {
            Authorization:
              'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('CREATE SESSION', response);
      return response.data.id;
    } catch (response) {
      let error = Object.assign({}, response);
      if (error.response && error.response.status === 409) {
        return sessionId;
      } else {
        console.log(error);
        console.warn(
          'No connection to OpenVidu Server. This may be a certificate error at ' +
            OPENVIDU_SERVER_URL
        );
        if (
          window.confirm(
            'No connection to OpenVidu Server. This may be a certificate error at "' +
              OPENVIDU_SERVER_URL +
              '"\n\nClick OK to navigate and accept it. ' +
              'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
              OPENVIDU_SERVER_URL +
              '"'
          )
        ) {
          window.location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
        }
      }
    }
  };

  const createToken = async function (sessionId) {
    try {
      let data = JSON.stringify({});
      const response = await axios.post(
        OPENVIDU_SERVER_URL +
          '/openvidu/api/sessions/' +
          sessionId +
          '/connection',
        data,
        {
          headers: {
            Authorization:
              'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('TOKEN', response);
      return response.data.token;
    } catch (error) {
      console.error(`Error retrieving session token with REST API ${error}`);
    }
  };

  return (
    <div>
      {!token ? null : (
        <VideoRoomComponent
          sessionName={sessionName}
          user={user}
          token={token}
        />
      )}
    </div>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));
