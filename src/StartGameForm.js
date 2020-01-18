import React from "react";
import PropTypes from "prop-types";

import Button from './Button';

export default class StartGameForm extends React.Component {
  static propTypes = {
    onCreateGameClick: PropTypes.func,
    onJoinGameClick: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      nameValue: '',
      roomCodeValue: '',
    };
  }

  handleNameChange(event) {
    this.setState({nameValue: event.target.value});
  }

  handleRoomCodeChange(event) {
    this.setState({roomCodeValue: event.target.value});
  }

  render() {
    return (
      <div>
        <div>
          <label>
            Name:
            <input type="text"
              value={this.state.nameValue}
              onChange={this.handleNameChange.bind(this)}
            />
          </label>
        </div>
        <p> ---- </p>
        <div>
          <Button name="Create New Game" onClick={
            () => {this.props.onCreateGameClick(this.state.nameValue)}
          }/>
        </div>
        <div>
          <p> -- OR -- </p>
        </div>
        <div>
          <label>
            Room Code:
            <input type="text"
              value={this.state.roomCodeValue}
              onChange={this.handleRoomCodeChange.bind(this)}
            />
          </label>
          <Button name="Join Existing Game" onClick={
            () => {this.props.onJoinGameClick(this.state.nameValue, this.state.roomCodeValue)}
          }/>
        </div>
      </div>
    );
  }
}
