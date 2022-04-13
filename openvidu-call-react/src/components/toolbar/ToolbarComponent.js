import React, { useState } from "react";
import "./ToolbarComponent.css";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Mic from "@material-ui/icons/Mic";
import MicOff from "@material-ui/icons/MicOff";
import Videocam from "@material-ui/icons/Videocam";
import VideocamOff from "@material-ui/icons/VideocamOff";
import Fullscreen from "@material-ui/icons/Fullscreen";
import FullscreenExit from "@material-ui/icons/FullscreenExit";
import SwitchVideoIcon from "@material-ui/icons/SwitchVideo";
import PictureInPicture from "@material-ui/icons/PictureInPicture";
import ScreenShare from "@material-ui/icons/ScreenShare";
import StopScreenShare from "@material-ui/icons/StopScreenShare";
import Tooltip from "@material-ui/core/Tooltip";
import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew";
import QuestionAnswer from "@material-ui/icons/QuestionAnswer";

import IconButton from "@material-ui/core/IconButton";

const logo = require("../../assets/images/openvidu_logo.png");

const ToolbarComponent = (props) => {
  const [fullscreen, setFullscreen] = useState(false);

  const micStatusChanged = () => {
    props.micStatusChanged();
  };

  const camStatusChanged = () => {
    props.camStatusChanged();
  };

  const screenShare = () => {
    props.screenShare();
  };

  const stopScreenShare = () => {
    props.stopScreenShare();
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
    props.toggleFullscreen();
  };

  const switchCamera = () => {
    props.switchCamera();
  };

  const leaveSession = () => {
    props.leaveSession();
  };

  const toggleChat = () => {
    props.toggleChat();
  };

  const mySessionId = props.sessionId;
  const localUser = props.user;

  return (
    <AppBar className="toolbar" id="header">
      <Toolbar className="toolbar">
        <div id="navSessionInfo">
          <img id="header_img" alt="OpenVidu Logo" src={logo} />

          {props.sessionId && (
            <div id="titleContent">
              <span id="session-title">{mySessionId}</span>
            </div>
          )}
        </div>

        <div className="buttonsContent">
          <IconButton
            color="inherit"
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

          <IconButton
            color="inherit"
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

          <IconButton
            color="inherit"
            className="navButton"
            onClick={screenShare}
          >
            {localUser !== undefined && localUser.isScreenShareActive() ? (
              <PictureInPicture />
            ) : (
              <ScreenShare />
            )}
          </IconButton>

          {localUser !== undefined && localUser.isScreenShareActive() && (
            <IconButton onClick={stopScreenShare} id="navScreenButton">
              <StopScreenShare color="secondary" />
            </IconButton>
          )}

          <IconButton
            color="inherit"
            className="navButton"
            onClick={switchCamera}
          >
            <SwitchVideoIcon />
          </IconButton>
          <IconButton
            color="inherit"
            className="navButton"
            onClick={toggleFullscreen}
          >
            {localUser !== undefined && fullscreen ? (
              <FullscreenExit />
            ) : (
              <Fullscreen />
            )}
          </IconButton>
          <IconButton
            color="secondary"
            className="navButton"
            onClick={leaveSession}
            id="navLeaveButton"
          >
            <PowerSettingsNew />
          </IconButton>
          <IconButton color="inherit" onClick={toggleChat} id="navChatButton">
            {props.showNotification && <div id="point" className="" />}
            <Tooltip title="Chat">
              <QuestionAnswer />
            </Tooltip>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default ToolbarComponent;
