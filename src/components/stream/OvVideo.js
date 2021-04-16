import React, { useEffect, useRef } from 'react';
import './StreamComponent.css';
import PropTypes from 'prop-types';

function OvVideoComponent(props) {
  const { user, mutedSound } = props;
  const videoRef = useRef();

  useEffect(() => {
    if (user.streamManager && !!videoRef) {
      console.log('PROPS: ', props);
      user.getStreamManager().addVideoElement(videoRef.current);
    }

    if (user.streamManager.session && user && !!videoRef) {
      user.streamManager.session.on('signal:userChanged', (event) => {
        const data = JSON.parse(event.data);
        if (data.isScreenShareActive !== undefined) {
          user.getStreamManager().addVideoElement(videoRef.current);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (videoRef) {
      user.getStreamManager().addVideoElement(videoRef.current);
    }
  }, [videoRef]);

  return (
    <video
      autoPlay={true}
      id={'video-' + user.getStreamManager().stream.streamId}
      ref={videoRef}
      muted={mutedSound}
    />
  );
}

OvVideoComponent.propTypes = {
  user: PropTypes.object.isRequired,
  mutedSound: PropTypes.bool,
};

OvVideoComponent.defaultProps = {
  mutedSound: true,
};

export default OvVideoComponent;
