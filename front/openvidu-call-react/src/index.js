import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import VideoRoomComponent from './components/VideoRoomComponent';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<VideoRoomComponent />, document.getElementById('root'));
registerServiceWorker();
