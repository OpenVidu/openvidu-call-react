import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./Login";
import VideoRoomComponent from './VideoRoomComponent'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isWorker: false
    }
  }

  setWorker = (val) => {
    this.setState({
      isWorker: val
    })
  }

  render() {
    return (
      <Router>
        <div>
          <Route
            path='/'
            render={(props) => <Login {...props} setWorker={this.setWorker}/>}
          />
          <Route
            path='/login'
            render={(props) => <Login {...props} setWorker={this.setWorker}/>}
          />
          <Route
            path='/room'
            render={(props) => <VideoRoomComponent {...props} isWorker={this.state.isWorker}/>}
          />
        </div>
      </Router>
    )
  }
}

export default Main;
