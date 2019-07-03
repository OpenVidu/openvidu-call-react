import {Button, Col, Icon} from "antd";
import {CheckComp} from "./checkComp";
import React, {Component} from "react";
import CloseIcon from '@material-ui/icons/Close';
import ShrinkIcon from '@material-ui/icons/TransitEnterexit';

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
  onEdit = (index) => {
    this.setState({
      isEditing: true,
      editItemKey: index,
      editable: this.state.protocols[index].description

    })
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
  submitChange = () => {
    this.updateItem(this.state.editItemKey, {description: this.state.editable});
    this.state.isEditing=false;
  }
  handleChangeEdit = (event) => {
    this.setState({
      editable: event.target.value
    })
  }
  toggleShrink = () => {
    if(!this.state.editable){
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
        <h2>Abnahmeprotokoll Schimmelschaden
          <span
            style={{
              float: 'right',
              cursor: 'pointer'
            }}
          >
            { this.state.isShrinked ?
              <img
                src="/more.png"
                alt="more"
                onClick={this.toggleShrink}
              />
              :
              <img
                src="/less.png"
                alt="less"
                onClick={this.toggleShrink}
              />
            }


          </span>
        </h2>
        <h4>
          Postillonstraße 17
          <br />
          80637 München
        </h4>
        { this.state.isShrinked ? null :
          <div
            style={{
              maxHeight : "50vh",
              overflowY : "scroll"
            }}
          >
            <CheckComp handleEdit={() => this.onEdit(0)} protocol={this.state.protocols[0]}/>
            <CheckComp handleEdit={() => this.onEdit(1)} protocol={this.state.protocols[1]}/>
            <CheckComp handleEdit={() => this.onEdit(2)} protocol={this.state.protocols[2]}/>
          </div>
        }
        <Button className="btn-check-ey">Bestätigen & Abschließen</Button>
      </div>
      { this.state.isEditing ?
        <div
          item
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
            <div className="edit-box-heading">
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
