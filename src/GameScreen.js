import React from "react";
import PropTypes from "prop-types";

import CurrentTurnDisplay from './CurrentTurnDisplay';
import EndTurnButton from './EndTurnButton';
import GameBoard from './GameBoard';
import PlayerList from './PlayerList';
import SpyCountDisplay from './SpyCountDisplay';
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

  switchTurns() {
    const gameRef = firebase.database().ref('games/' + this.props.gameID);
    gameRef.update({
      currentTurn: this.state.currentTurn === TEAMS.RED ? TEAMS.BLUE : TEAMS.RED,
    });
  }

  submitGuess(row, column, role) {
    console.log("("+row+", "+column+") " + role);
    const guessedWord = this.state.gameBoardState[row][column];
    if (guessedWord.isRevealed) {
      return;
    }
    

    if (
      (guessedWord.team === TEAMS.BLUE && role === ROLES.RED_SPY)
      || (guessedWord.team === TEAMS.RED && role === ROLES.BLUE_SPY)
      || (guessedWord.team === TEAMS.NEUTRAL)
    ) {
      this.switchTurns();
    } else if (guessedWord.team === TEAMS.ASSASSIN) {
      const gameRef = firebase.database().ref('games/' + this.props.gameID);
      // gameRef.update({
      //   currentTurn: ,
      // });
    } else {
      throw Error('UNHANDLED CASE WHEN GUESSING WORD: ' + JSON.stringify(guessedWord));
    }

    const wordRef = firebase.database().ref('games/' + this.props.gameID + '/gameBoardState/' + row + '/' + column);
    wordRef.update({
      isRevealed: true,
    });
  }

  _renderStartGameButton() {
    if (!this._canStartGame()) {
      return null;
    }
    return (
      <div>
        <button onClick={this.startGame.bind(this)}>Start Game</button>
      </div>
    );
  }

  render() {
    const playerRole = this.state.players[getCurrentUserID()].role;
    return (
      <div className="Game-screen-root">
        <div className="Game-screen">
          <div className="Game-info">
            <div>
              <p> Room Code: {this.state.roomCode} </p>
              <PlayerList gameID={this.props.gameID} players={this.state.players} />
            </div>
            <CurrentTurnDisplay currentTurn={this.state.currentTurn} />
            <SpyCountDisplay gameBoardState={this.state.gameBoardState} />
            <EndTurnButton currentTurn={this.state.currentTurn} playerRole={playerRole} onClick={this.switchTurns.bind(this)} />
          </div>
          {this._renderStartGameButton()}
          <div>
            <GameBoard 
              currentTurn={this.state.currentTurn}
              playerRole={playerRole}
              gameBoardState={this.state.gameBoardState}
              submitGuessCallback={this.submitGuess.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}
