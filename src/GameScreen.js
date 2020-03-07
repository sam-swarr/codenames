import React from "react";
import PropTypes from "prop-types";

import GameBoard from './GameBoard';
import PlayerList from './PlayerList';
import {getCurrentUserID} from './UserAuth';
import {createGameBoard, ROLES, TEAMS} from './Utils';

import * as firebase from "firebase/app";
import "firebase/database";

export default class GameScreen extends React.Component {
  static propTypes = {
    gameID: PropTypes.string,
    initialGameState: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      players: this.props.initialGameState.players,
    }
    this.removeUser = this.removeUserFromGame.bind(this);
  }

  async removeUserFromGame() {
    const currentPlayerRef = firebase.database()
      .ref('games/' + this.props.gameID + '/players/' + getCurrentUserID());
    await currentPlayerRef.remove();
  }

  componentDidMount() {
    var isOnIOS = navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPod/i);
    var eventType = isOnIOS ? 'pagehide' : 'unload';
    window.addEventListener(eventType, this.removeUser);

    const gameRef = firebase.database().ref('games/' + this.props.gameID);
    gameRef.on('value', snapshot => {
      this.setState(snapshot.val());
    });
  }

  componentWillUnmount() {
    window.removeEventListener('unload', this.removeUser);
  }

  _roleTaken(role) {
    return Object.values(this.state.players).some((playerData) => {
      return playerData.role && playerData.role === role;
    });
  }

  _canStartGame() {
    return !this.state.gameStarted
      && this._roleTaken(ROLES.BLUE_SPYMASTER)
      && this._roleTaken(ROLES.RED_SPYMASTER)
      && this._roleTaken(ROLES.BLUE_SPY)
      && this._roleTaken(ROLES.RED_SPY);
  }

  startGame() {
    const redGoesFirst = Math.random() < 0.5;
    const gameBoardState = createGameBoard(redGoesFirst);
    const gameRef = firebase.database().ref('games/' + this.props.gameID);
    gameRef.update({
      currentTurn: redGoesFirst ? TEAMS.RED : TEAMS.BLUE,
      gameBoardState: gameBoardState,
      gameStarted: true,
    });
  }

  render() {
    console.log("STATE: ");
    console.log(this.state);
    return (
      <div>
        <div>
          <p> Room Code: {this.state.roomCode} </p>
          <PlayerList gameID={this.props.gameID} players={this.state.players} />
        </div>
        <div>
          <button hidden={!this._canStartGame()} onClick={this.startGame.bind(this)}>Start Game</button>
        </div>
        <div>
          <GameBoard gameBoardState={this.state.gameBoardState} />
        </div>
      </div>
    );
  }
}
