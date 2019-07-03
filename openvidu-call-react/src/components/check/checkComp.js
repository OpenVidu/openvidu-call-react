import React, { Component } from "react";

import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import './checkComp.css';

import { Row, Col, Button, Icon } from "antd";

export class CheckComp extends Component {
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
          <h4>{this.props.protocol.title}</h4>
          <h6>
            {this.props.protocol.description}
          </h6>
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
            <Fab color="primary" aria-label="Add" style={{
              marginRight : "1rem"}}>
              <CloseIcon />
             </Fab>
            {/* </Col>
        <Col
          xs={{ span: 3, offset: 0 }}
          sm={{ span: 3, offset: 0 }}
          mg={{ span: 3, offset: 0 }}
          lg={{ span: 3, offset: 0 }}
          xl={{ span: 3, offset: 0 }}
        >    */}
            <Fab color="primary" aria-label="Add">
              <CheckIcon />
             </Fab>
            {/* </Col> */}

            </span>
            <IconButton onClick={this.props.handleEdit}>
              <EditIcon/>
            </IconButton>
          </div>
        </Col>
      </Row>
    );
  }
}
