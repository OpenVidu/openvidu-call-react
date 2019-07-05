import {Button, Col, Icon} from "antd";
import {CheckComp} from "./checkComp";
import React, {Component} from "react";
import CloseIcon from '@material-ui/icons/Close';

import InputBase from '@material-ui/core/InputBase';


const Rule = ({ color }) => (
  <div
    className="line-2"
  />
);

export class CheckList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      btnCheked :  0,
      protocols: [
        {
          title: 'Sichtbarer Schimmel',
          description: 'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras mattis consectetur purus sit amet fermentum.\n' +
            '\n' + 'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Etiam porta sem malesuada magna mollis euismod. Maecenas faucibus mollis mollis interdum. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.'
        },
        {
          title: 'Dolor Risus Condimentum',
          description: 'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras mattis consectetur purus sit amet fermentum.\n' +
            '\n' + 'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Etiam porta sem malesuada magna mollis euismod. Maecenas faucibus mollis mollis interdum. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.'
        },
        {
          title: 'Magna Bibendum Fermentum',
          description: 'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras mattis consectetur purus sit amet fermentum.\n' +
            '\n' + 'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Etiam porta sem malesuada magna mollis euismod. Maecenas faucibus mollis mollis interdum. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.'
        }
      ],
      isEditing: false,
      editItemKey: -1,
      editable: '',
      isShrinked: false
    }
  }

  componentDidMount() {
    this.props.user.getStreamManager().stream.session.on('signal:change-protocol', (event) => {
      const data = JSON.parse(event.data);
      this.setState({ protocols: data });
    });
  }

  onEdit = (index) => {
    this.setState({
      isEditing: true,
      editItemKey: index,
      editable: this.state.protocols[index].description

    })
  }

  disableBtnClose = () =>{
    let val  = this.state.btnCheked - 1
    console.log(this.state.btnCheked,this.state.protocols.length, val ,"disabled close button")
      this.setState({
        btnCheked : val
      })
  }

  disableBtn = () => {
    let val  = this.state.btnCheked + 1
    console.log(this.state.btnCheked,this.state.protocols.length, val ,"disabled button")
    if(val <= this.state.protocols.length){
      this.setState({
        btnCheked : val
      })
    }
  }

  closeEdit = () => {
    this.setState({
      isEditing: false,
      editItemKey: -1
    })
  }
  updateItem = (index, itemAttributes) => {
    this.setState({
      protocols: [
        ...this.state.protocols.slice(0,index),
        Object.assign({}, this.state.protocols[index], itemAttributes),
        ...this.state.protocols.slice(index+1)
      ]
    });
  }
  submitChange = async () => {
    await this.updateItem(this.state.editItemKey, {description: this.state.editable});
    this.props.user.getStreamManager().stream.session.signal({
      data: JSON.stringify(this.state.protocols),
      type: 'change-protocol',
    });
    this.closeEdit();
  }
  handleChangeEdit = (event) => {
    this.setState({
      editable: event.target.value
    })
  }
  toggleShrink = () => {
    if(!this.state.isEditing){
      this.setState({
        isShrinked: !this.state.isShrinked
      })
    }
  }
  render() {
    return <div
      className="check-list-ey"
    >
      <div
        className="check-box"
      >
        <div className="title-container">
          <div className="title-check-box">
            Abnahmeprotokoll Schimmelschaden
          </div>
          <span
            style={{
              float: 'right',
              cursor: 'pointer'
            }}
            onClick={this.toggleShrink}
          >
            { this.state.isShrinked ?
              <img
                src="/more.png"
                alt="more"
              />
              :
              <img
                src="/less.png"
                alt="less"
              />
            }
          </span>
        </div>
        <div className="address">
          Postillonstraße 17
          <br />
          80637 München
        </div>
        { this.state.isShrinked ? null :
          <div
            style={{
              maxHeight : "50vh",
              overflowY : "scroll"
            }}
          >
            <CheckComp handleEdit={() => this.onEdit(0)} clickCheck={this.disableBtn} clickClose={this.disableBtnClose} protocol={this.state.protocols[0]}/>
            <CheckComp handleEdit={() => this.onEdit(1)} clickCheck={this.disableBtn} clickClose={this.disableBtnClose} protocol={this.state.protocols[1]}/>
            <CheckComp handleEdit={() => this.onEdit(2)} clickCheck={this.disableBtn} clickClose={this.disableBtnClose} protocol={this.state.protocols[2]}/>
          </div>
        }
        {
          this.state.btnCheked === this.state.protocols.length ? <Button className="btn-check-ey">Bestätigen & Abschließen</Button> : <Button style={{backgroundColor : 'red !important' ,color : "grey" , cursor : "disabled"}} className="btn-check-ey">Bestätigen & Abschließen</Button>
        }
        
      </div>
      { this.state.isEditing ?
        <div
          className="edit-box"
        >
          <div>
            <div className="edit-box-heading">
              Protokoll Item editieren
              <span
                style={{
                  float: 'right',
                  cursor: 'pointer'
                }}
                onClick={this.closeEdit}

              >
                <CloseIcon/>
              </span>
            </div>
            <Rule/>
            <div className="edit-box-title">
              {this.state.protocols[this.state.editItemKey].title}
            </div>
            <div className="edit-container">
              <InputBase
                className="edit-input"
                multiline
                rows="20"
                value={this.state.editable}
                onChange={this.handleChangeEdit}
              />
            </div>
          </div>
          <Button
            className="btn-check-ey-2"
            onClick={this.submitChange}
          >
            Bestätigen & Abschließen
          </Button>

        </div>
        : null }
    </div>
  }
}
