import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./login/Login";
import VideoRoomComponent from './VideoRoom/VideoRoomComponent'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    }
  }

  setWorker = (val) => {
    this.setState({
      isLoggedIn: true
    })
  }

  render() {
    return (
      <Router>
          <Route
            path='/'
            exact
            render={
              (props) =>
                <Login
                  {...props}
                  setWorker={this.setWorker}
                />
            }
          />
          <Route
            path='/login'
            render={
              (props) =>
                <Login
                  {...props}
                  setWorker={this.setWorker}
                />
            }
          />
          <Route
            path='/room'
            render={
              (props) =>
                <VideoRoomComponent
                  {...props}
                  isWorker={false}
                  isLoggedIn={this.state.isLoggedIn}
                />
            }
          />
          <Route
            path='/worker'
            render={
              (props) =>
                <VideoRoomComponent
                  {...props}
                  isWorker={true}
                  isLoggedIn={this.state.isLoggedIn}
                />
            }
          />
      </Router>
    )
  }
}

export default Main;
