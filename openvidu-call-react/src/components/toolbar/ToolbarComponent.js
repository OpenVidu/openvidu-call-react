import React, { Component } from 'react';
import './ToolbarComponent.css';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
import Videocam from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';
import Fullscreen from '@material-ui/icons/Fullscreen';
import FullscreenExit from '@material-ui/icons/FullscreenExit';
import SwitchVideoIcon from '@material-ui/icons/SwitchVideo';
import PictureInPicture from '@material-ui/icons/PictureInPicture';
import ScreenShare from '@material-ui/icons/ScreenShare';
import StopScreenShare from '@material-ui/icons/StopScreenShare';
import Tooltip from '@material-ui/core/Tooltip';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import FlipCameraIosIcon from '@material-ui/icons/FlipCameraIos';

import IconButton from '@material-ui/core/IconButton';

const logo = require('../../assets/images/openvidu_logo.png');

export default class ToolbarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { fullscreen: false };
        this.camStatusChanged = this.camStatusChanged.bind(this);
        this.micStatusChanged = this.micStatusChanged.bind(this);
        this.screenShare = this.screenShare.bind(this);
        this.stopScreenShare = this.stopScreenShare.bind(this);
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
        this.switchCamera = this.switchCamera.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
        this.toggleChat = this.toggleChat.bind(this);
        this.toggleCamera = this.toggleCamera.bind(this);
    }


    micStatusChanged() {
        this.props.micStatusChanged();
    }

    camStatusChanged() {
        this.props.camStatusChanged();
    }

    screenShare() {
        this.props.screenShare();
    }

    stopScreenShare() {
        this.props.stopScreenShare();
    }

    toggleFullscreen() {
        this.setState({ fullscreen: !this.state.fullscreen });
        this.props.toggleFullscreen();
    }

    switchCamera() {
        this.props.switchCamera();
    }

    leaveSession() {
        this.props.leaveSession();
    }

    toggleChat() {
        this.props.toggleChat();
    }

    toggleCamera() {
        this.props.toggleCamera();
    }

    render() {
        const mySessionId = this.props.sessionId;
        const localUser = this.props.user;
        return (
            <AppBar className="toolbar" id="header">
                <Toolbar className="toolbar">
                    <div id="navSessionInfo">
                        <img
                            id="header_img"
                            alt="OpenVidu Logo"
                            src={logo}
                        />

                        {this.props.sessionId && <div id="titleContent">
                            <span id="session-title">{mySessionId}</span>
                        </div>}
                    </div>

                    <div className="buttonsContent">
                        <IconButton color="inherit" className="navButton" id="navMicButton" onClick={this.micStatusChanged}>
                            {localUser !== undefined && localUser.isAudioActive() ? <Mic /> : <MicOff color="secondary" />}
                        </IconButton>

                        <IconButton color="inherit" className="navButton" id="navCamButton" onClick={this.camStatusChanged}>
                            {localUser !== undefined && localUser.isVideoActive() ? (
                                <Videocam />
                            ) : (
                                <VideocamOff color="secondary" />
                            )}
                        </IconButton>

                        {this.props.isToggleable &&
                            <IconButton color="inherit" className="navButton" id="navToggleCamButton" onClick={this.toggleCamera}>
                                <FlipCameraIosIcon />
                            </IconButton>
                        }
                        
                        <IconButton color="inherit" className="navButton" onClick={this.screenShare}>
                            {localUser !== undefined && localUser.isScreenShareActive() ? <PictureInPicture /> : <ScreenShare />}
                        </IconButton>

                        {localUser !== undefined &&
                            localUser.isScreenShareActive() && (
                                <IconButton onClick={this.stopScreenShare} id="navScreenButton">
                                    <StopScreenShare color="secondary" />
                                </IconButton>
                            )}

                        <IconButton color="inherit" className="navButton" onClick={this.switchCamera}>
                            <SwitchVideoIcon />
                        </IconButton>
                        <IconButton color="inherit" className="navButton" onClick={this.toggleFullscreen}>
                            {localUser !== undefined && this.state.fullscreen ? <FullscreenExit /> : <Fullscreen />}
                        </IconButton>
                        <IconButton color="secondary" className="navButton" onClick={this.leaveSession} id="navLeaveButton">
                            <PowerSettingsNew />
                        </IconButton>
                        <IconButton color="inherit" onClick={this.toggleChat} id="navChatButton">
                            {this.props.showNotification && <div id="point" className="" />}
                            <Tooltip title="Chat">
                                <QuestionAnswer />
                            </Tooltip>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}
