import React from "react";
import PropTypes from "prop-types";

import {ROLES} from './Utils';

import GameStatusDisplay from './GameStatusDisplay';
import EndTurnButton from './EndTurnButton';
import PlayerList from './PlayerList';
import SpyCountDisplay from './SpyCountDisplay';

import DropdownButton from 'react-bootstrap/DropdownButton';

export default class GameInfo extends React.Component {
  static propTypes = {
      canStartGame: PropTypes.bool,
      startGame: PropTypes.func,
      gameID: PropTypes.string,
      roomCode: PropTypes.string,
      players: PropTypes.object,
      playerRole: PropTypes.oneOf(Object.values(ROLES)),
      gameStatus: PropTypes.string,
      gameBoardState: PropTypes.array,
      switchTurns: PropTypes.func,
  };

  _renderStartGameButton() {
    if (!this.props.canStartGame) {
      return null;
    }
    return (
      <div>
        <button onClick={this.props.startGame}>Start Game</button>
      </div>
    );
  }

  render() {
    return (
      <div className="Game-info">
        <div className="Player-info">
          <p className="Room-code-display"> Room Code: <span className="Room-code-text">{this.props.roomCode}</span></p>
          <PlayerList gameID={this.props.gameID} players={this.props.players} />
        </div>
        <GameStatusDisplay gameStatus={this.props.gameStatus} />
        <SpyCountDisplay gameBoardState={this.props.gameBoardState} />
        <EndTurnButton gameStatus={this.props.gameStatus} playerRole={this.props.playerRole} onClick={this.props.switchTurns} />
        {this._renderStartGameButton()}
      </div>
    );
  }

}
