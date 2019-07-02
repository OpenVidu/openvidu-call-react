import React, { Component } from "react";

import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Badge from '@material-ui/core/Badge';

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
          <h4>Sichtbarer Schimmel</h4>
          <h6>
            Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum
            nibh, ut fermentum massa justo sit amet risus. Cras mattis
            consectetur purus sit amet fermentum.
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
            <Fab color="primary" aria-label="Add" >
              <CheckIcon />
             </Fab>
            {/* </Col> */}

          </span>
          <Badge badgeContent={4} style={{
              float : "right !important"
          }}>
                <Icon type="message" theme="filled" style={{
                    fontSize : "1.5rem",
                }}/>
            </Badge>
          </div>
        </Col>
      </Row>
    );
  }
}
