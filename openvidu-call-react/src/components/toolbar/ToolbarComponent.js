import React, { Component } from 'react';
import './ToolbarComponent.css';

import Tooltip from '@material-ui/core/Tooltip';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';

import IconButton from '@material-ui/core/IconButton';

export default class ToolbarComponent extends Component {
    constructor(props) {
        super(props);
        this.leaveSession = this.leaveSession.bind(this);
        this.toggleChat = this.toggleChat.bind(this);
    }

    leaveSession() {
        this.props.leaveSession();
    }

    toggleChat() {
        this.props.toggleChat();
    }

    render() {
        const mySessionId = this.props.sessionId;
        const localUser = this.props.user;
        return (
          <div className="toolbar">
              <div className="top-flex">
                  <button className="navButton" onClick={this.leaveSession}>
                      <PowerSettingsNew />
                  </button>
              </div>
              <div className="bottom-flex">
                  <button onClick={this.toggleChat}>
                      {this.props.showNotification && <div id="point" className="" />}
                      <Tooltip title="Chat">
                          <QuestionAnswer />
                      </Tooltip>
                  </button>
              </div>
          </div>
        );
    }
}
