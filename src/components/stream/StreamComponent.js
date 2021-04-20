import React, { useState } from 'react';
import './StreamComponent.css';
import MicOff from '@material-ui/icons/MicOff';
import VideocamOff from '@material-ui/icons/VideocamOff';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeOff from '@material-ui/icons/VolumeOff';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import HighlightOff from '@material-ui/icons/HighlightOff';
import FormHelperText from '@material-ui/core/FormHelperText';
import PropTypes from 'prop-types';

import OvVideoComponent from './OvVideo';

function StreamComponent(props) {
  const { user, showNickname, allowNicknameEdit, handleNickname } = props;
  const [nickname, setNickname] = useState(user.getNickname());
  const [showForm, setShowForm] = useState(false);
  const [muted, setMuted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);

  const handleNicknameChange = function (event) {
    setNickname(event.target.value);
    event.preventDefault();
  };

  const toggleNicknameForm = function () {
    if (user.isLocal()) {
      setShowForm(!showForm);
    }
  };

  const toggleSound = function () {
    setMuted(!muted);
  };

  const handleNicknameSubmit = function (event) {
    if (event.key === 'Enter') {
      console.log(nickname);
      if (nickname.length >= 3 && nickname.length <= 20) {
        handleNickname(nickname);
        toggleNicknameForm();
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    }
  };

  return (
    <div className="OT_widget-container">
      {showNickname && (
        <div className="pointer nickname">
          {showForm ? (
            <FormControl id="nicknameForm">
              <IconButton id="closeButton" onClick={toggleNicknameForm}>
                <HighlightOff />
              </IconButton>
              <InputLabel htmlFor="name-simple" id="label">
                Nickname
              </InputLabel>
              <Input
                id="input"
                value={nickname}
                onChange={handleNicknameChange}
                onKeyPress={handleNicknameSubmit}
                required
              />
              {!isFormValid && nickname.length <= 3 && (
                <FormHelperText id="name-error-text">
                  Nickname is too short!
                </FormHelperText>
              )}
              {!isFormValid && nickname.length >= 20 && (
                <FormHelperText id="name-error-text">
                  Nickname is too long!
                </FormHelperText>
              )}
            </FormControl>
          ) : (
            <div onClick={allowNicknameEdit && toggleNicknameForm}>
              <span id="nickname">{nickname}</span>
              {user.isLocal() && allowNicknameEdit && (
                <span id=""> (edit)</span>
              )}
            </div>
          )}
        </div>
      )}

      {user && user.getStreamManager() ? (
        <div className="streamComponent">
          <OvVideoComponent user={user} muted={muted} />
          <div id="statusIcons">
            {!user.isVideoActive() ? (
              <div id="camIcon">
                <VideocamOff id="statusCam" />
              </div>
            ) : null}

            {!user.isAudioActive() ? (
              <div id="micIcon">
                <MicOff id="statusMic" />
              </div>
            ) : null}
          </div>
          <div>
            {!user.isLocal() && (
              <IconButton id="volumeButton" onClick={toggleSound}>
                {muted ? <VolumeOff color="secondary" /> : <VolumeUp />}
              </IconButton>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

StreamComponent.propTypes = {
  user: PropTypes.object.isRequired,
  showNickname: PropTypes.bool,
  allowNicknameEdit: PropTypes.bool,
  handleNickname: PropTypes.func,
};

StreamComponent.defaultProps = {
  showNickname: true,
  allowNicknameEdit: true,
};

export default StreamComponent;
