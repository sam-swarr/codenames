import React from "react";
import PropTypes from "prop-types";

import Button from './Button';

export default class StartGameForm extends React.Component {
  static propTypes = {
    onCreateGameClick: PropTypes.func,
    onJoinGameClick: PropTypes.func,
    shakeRoomCode: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      nameValue: '',
      roomCodeValue: '',
      shakeName: false,
    };
  }

  handleNameChange(event) {
    this.setState({nameValue: event.target.value});
  }

  handleRoomCodeChange(event) {
    this.setState({roomCodeValue: event.target.value});
  }

  _addShakeName() {
    this.setState({
      shakeName: true,
    })
    setTimeout(() => {
      this.setState({
        shakeName: false,
      });
    }, 1000);
  }

  handleJoinRoomClick() {
    if (this.state.nameValue === '') {
      this._addShakeName();
    } else {
      this.props.onJoinGameClick(this.state.nameValue, this.state.roomCodeValue.trim());
    }
  }

  handleNewGameClick() {
    if (this.state.nameValue === '') {
      this._addShakeName();
    } else {
      this.props.onCreateGameClick(this.state.nameValue);
    }
  }

  render() {
    let nameClasses = "Name-input-wrapper";
    if (this.state.shakeName) {
      nameClasses += " shake";
    }

    let roomCodeClasses = "Join-room-wrapper";
    if (this.props.shakeRoomCode) {
      roomCodeClasses += " shake";
    }
    return (
      <div className="Start-game-form">
        <div className={nameClasses}>
          <label className="Name-input-label">Name</label>
          <input className="Name-input" type="text"
            placeholder={"Enter your name"}
            value={this.state.nameValue}
            onChange={this.handleNameChange.bind(this)}
          />
        </div>
        <div>
          <div className={roomCodeClasses}>
            <label className="Name-input-label">Room Code</label>
            <input 
              className="Name-input Room-code"
              type="text"
              placeholder={"Enter 4 letter room code"}
              value={this.state.roomCodeValue}
              onChange={this.handleRoomCodeChange.bind(this)}
            />
          </div>
          <Button className="Create-game-button" name="Join Existing Game" onClick={this.handleJoinRoomClick.bind(this)} />
        </div>
        <div className={"Or-wrapper"}>
          <p> ― OR ― </p>
        </div>
        <div>
          <Button className="Create-game-button" name="Create New Game" onClick={this.handleNewGameClick.bind(this)} />
        </div>
      </div>
    );
  }
}
