import React, { Component } from 'react';
import './StreamComponent.css';

export default class OvVideoComponent extends Component {
    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidMount() {
        if (this.props && this.props.user.streamManager && !!this.videoRef) {
            console.log('PROPS: ', this.props);
            this.props.user.streamManager.addVideoElement(this.videoRef.current);
        }

        if (this.props && this.props.user.streamManager.session && this.props.user && !!this.videoRef) {
            this.props.user.streamManager.session.on('signal:userChanged', (event) => {
                const data = JSON.parse(event.data);
                if (data.isScreenShareActive !== undefined) {
                    this.props.user.streamManager.addVideoElement(this.videoRef.current);
                }
            });
        }
    }

    render() {
        return (
            <video
                autoPlay={true}
                id={'video-' + this.props.user.getConnectionId()}
                ref={this.videoRef}
                muted={this.props.mutedSound}
            />
        );
    }
}
