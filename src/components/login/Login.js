import React, { Component } from "react";
import './login.css'
import logo from '../images/logo.svg';
import buo from "../images/buo.png";
import eayse from "../images/eayse.svg"

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isWorker: '',
      email: 'oreo@apeunit.com',
      password: 'password123'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }



  handleSubmit = (event) => {
    this.props.setWorker(this.state.isWorker)
    this.props.history.push('/room')
  }

  render() {
    return (
      <div className="login">
        <div className="head">
          <div className="details">
          <div>
            <div className="title">
              Treten Sie dem Termin zur Abnahme bei
            </div>
            <div className="info">
              Eingeladen von: Herr Kastner <br/>
              Thema: Schimmelschaden <br/>
              Straße: Postillonstraße 17 <br/>
              PLZ & Ort: 80637 München
            </div>

          </div>
        </div>
          <div className="login-box">
          <div className="small-screen-login">
            <div className='user'>
              <h4>Loggen Sie mit lhrem <br/><span className='blue-font'>B&O Account</span> ein</h4>
              <form>
                <input type="email" name="email" placeholder="E-mail Address" className="lg-btn-inp-ey" value={this.state.email}/>

                <input type="password" name="password" placeholder="Password" className="lg-btn-inp-ey"  value={this.state.password} />

                <div class="password">Password vergessen</div>

                <input type="submit" value="Abnahme Beitreten" style={{margin: '45px 0 0 0'}} onClick={this.handleSubmit}/>
              </form>
            </div>

          </div>
        </div>
        </div>
        <div className="foot">
            <div className="padding-top-10">
                Kommunikationstaol von <img src={buo} className="logo" alt="Logo" /><br />
                Powered by <img src={eayse} className="logo" alt="Logo" />
            </div>
        </div>
      </div>
    );
  }
}

export default Login
