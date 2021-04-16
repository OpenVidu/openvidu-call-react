import React, { useState } from 'react';
import './ToolbarComponent.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
import Videocam from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';
import Fullscreen from '@material-ui/icons/Fullscreen';
import FullscreenExit from '@material-ui/icons/FullscreenExit';
import ScreenShare from '@material-ui/icons/ScreenShare';
import StopScreenShare from '@material-ui/icons/StopScreenShare';
import Tooltip from '@material-ui/core/Tooltip';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';

const openViduLogo = require('../../assets/images/openvidu_logo.png');

function ToolbarComponent(props) {
  const {
    sessionId,
    showNotification,
    controls,
    logo,
    title,
    hideLogo,
    hideTitle,
    user: localUser,
    micStatusChanged: micStatusChangedCallback,
    camStatusChanged: camStatusChangedCallback,
    screenShare: screenShareCallback,
    stopScreenShare: stopScreenShareCallback,
    toggleFullscreen: toggleFullscreenCallback,
    leaveSession: leaveSessionCallback,
    toggleChat: toggleChatCallback,
  } = props;
  const [fullscreen, setFullscreen] = useState(false);

  const micStatusChanged = function () {
    micStatusChangedCallback();
  };

  const camStatusChanged = function () {
    camStatusChangedCallback();
  };

  const screenShare = function () {
    screenShareCallback();
  };

  const stopScreenShare = function () {
    stopScreenShareCallback();
  };

  const toggleFullscreen = function () {
    setFullscreen(!fullscreen);
    toggleFullscreenCallback();
  };

  const leaveSession = function () {
    leaveSessionCallback();
  };

  const toggleChat = function () {
    toggleChatCallback();
  };

  return (
    <AppBar className="toolbar" id="header">
      <Toolbar className="toolbar">
        <div id="navSessionInfo">
          {!hideLogo && logo}
          {!hideTitle &&
            (!title
              ? sessionId && (
                  <div id="titleContent">
                    <span id="session-title">{sessionId}</span>
                  </div>
                )
              : null)}
        </div>

        <div className="buttonsContent">
          {controls.microphone && (
            <Tooltip
              title={
                localUser !== undefined && localUser.isAudioActive()
                  ? 'Mute'
                  : 'Unmute'
              }
            >
              <IconButton
                style={{ color: 'white' }}
                className="navButton"
                id="navMicButton"
                onClick={micStatusChanged}
              >
                {localUser !== undefined && localUser.isAudioActive() ? (
                  <Mic />
                ) : (
                  <MicOff color="secondary" />
                )}
              </IconButton>
            </Tooltip>
          )}

          {controls.camera && (
            <Tooltip
              title={
                localUser !== undefined && localUser.isVideoActive()
                  ? 'Close Video'
                  : 'Open Video'
              }
            >
              <IconButton
                style={{ color: 'white' }}
                className="navButton"
                id="navCamButton"
                onClick={camStatusChanged}
              >
                {localUser !== undefined && localUser.isVideoActive() ? (
                  <Videocam />
                ) : (
                  <VideocamOff color="secondary" />
                )}
              </IconButton>
            </Tooltip>
          )}

          {controls.screenShare &&
            (localUser !== undefined && localUser.isScreenShareActive() ? (
              <Tooltip title={'Stop Screen Sharing'}>
                <IconButton
                  style={{ color: 'white' }}
                  onClick={stopScreenShare}
                  id="navScreenButton"
                >
                  <StopScreenShare color="secondary" />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title={'Share Screen'}>
                <IconButton
                  style={{ color: 'white' }}
                  className="navButton"
                  onClick={screenShare}
                >
                  <ScreenShare />
                </IconButton>
              </Tooltip>
            ))}

          {controls.fullscreen && (
            <Tooltip
              title={
                localUser !== undefined && fullscreen
                  ? 'Exit Fullscreen'
                  : 'Fullscreen'
              }
            >
              <IconButton
                style={{ color: 'white' }}
                className="navButton"
                onClick={toggleFullscreen}
              >
                {localUser !== undefined && fullscreen ? (
                  <FullscreenExit />
                ) : (
                  <Fullscreen />
                )}
              </IconButton>
            </Tooltip>
          )}

          {controls.leave && (
            <Tooltip title={'Leave Session'}>
              <IconButton
                color="secondary"
                className="navButton"
                onClick={leaveSession}
                id="navLeaveButton"
              >
                <PowerSettingsNew />
              </IconButton>
            </Tooltip>
          )}

          {controls.chat && (
            <Tooltip title="Chat">
              <IconButton
                style={{ color: 'white' }}
                onClick={toggleChat}
                id="navChatButton"
              >
                {showNotification && <div id="point" className="" />}
                <QuestionAnswer />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

ToolbarComponent.propTypes = {
  sessionId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  controls: PropTypes.object,
  hideLogo: PropTypes.bool,
  hideTitle: PropTypes.bool,
  logo: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.elementType,
  ]),
  title: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.elementType,
  ]),
  showNotification: PropTypes.func,
  micStatusChanged: PropTypes.func,
  camStatusChanged: PropTypes.func,
  screenShare: PropTypes.func,
  stopScreenShare: PropTypes.func,
  toggleFullscreen: PropTypes.func,
  leaveSession: PropTypes.func,
  toggleChat: PropTypes.func,
};

ToolbarComponent.defaultProps = {
  controls: {
    microphone: true,
    camera: true,
    screenShare: true,
    fullscreen: true,
    leave: true,
    chat: true,
  },
  logo: <img id="header_img" alt="OpenVidu Logo" src={openViduLogo} />,
  hideLogo: false,
  hideTitle: false,
};

export default ToolbarComponent;
