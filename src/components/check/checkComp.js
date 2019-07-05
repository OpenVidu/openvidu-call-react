import React, { Component } from "react";

import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import './checkComp.css';

import { Row, Col } from "antd";

export class CheckComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCloseSelected: false,
      isCheckSelected: false
    }
  }
  selectClose = () => {
    this.props.clickClose()
    this.setState({
      isCloseSelected: true,
      isCheckSelected: false
    })
  }
  selectCheck= () => {
    this.props.clickCheck()
    this.setState({
      isCloseSelected: false,
      isCheckSelected: true
    })
  }
  render() {
    return (
      <Row>
        <Col
          className="check-ind-ey"
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          mg={{ span: 24, offset: 0 }}
          lg={{ span: 24, offset: 0 }}
          xl={{ span: 24, offset: 0 }}
        >
          <div className="check-comp-title">
            {this.props.protocol.title}
          </div>
          <div className="check-comp-description">
            {this.props.protocol.description}
          </div>
          <div className="act-btn-ey">
          <span>
            {/* <Col
            className=''
          xs={{ span: 3, offset: 0 }}
          sm={{ span: 3, offset: 0 }}
          mg={{ span: 3, offset: 0 }}
          lg={{ span: 3, offset: 0 }}
          xl={{ span: 3, offset: 0 }}
        >    */}
            {!this.state.isCloseSelected ?
              <Fab
                color="default"
                aria-label="Add"
                style={{
                  marginRight: "1rem",
                  background: '#fff'
                }}
                size="small"
                onClick={this.selectClose}
              >
                <CloseIcon
                  color="secondary"
                />
              </Fab>
              :
              <Fab
                color="secondary"
                variant="outlined"
                aria-label="Add"
                style={{
                  marginRight: "1rem"
                }}
                size="small"
                onClick={this.selectClose}
              >
                <CloseIcon/>
              </Fab>
            }

            {!this.state.isCheckSelected ?

              <Fab
                aria-label="Add"
                style={{
                  marginRight: "1rem",
                  background: '#fff'
                }}
                size="small"
                onClick={this.selectCheck}
              >
                <CheckIcon
                  color="primary"
                />
              </Fab>
              :
              <Fab
                color="primary"
                aria-label="Add"
                size="small"
                onClick={this.selectCheck}
              >
                <CheckIcon/>
              </Fab>
            }
            {/* </Col> */}

            </span>
            <IconButton onClick={this.props.handleEdit}>
              <EditIcon                 style={{
                  color : 'black'
                }}/>
            </IconButton>
          </div>
        </Col>
      </Row>
    );
  }
}
