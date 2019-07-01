import React, {Component} from "react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {isWorker: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeWorker = (event) => {
    this.setState({isWorker: event.target.checked});
  }

  handleSubmit = (event) => {
    this.props.setWorker(this.state.isWorker)
    this.props.history.push('/room')
  }

  render() {
    return (
      <div>
        <button onClick={this.handleSubmit}>Login</button>
      </div>
    );
  }
}

export default Login
