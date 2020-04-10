import React from "react";
import PropTypes from "prop-types";

import GameBoard from './GameBoard';
import GameInfo from './GameInfo';
import {getCurrentUserID} from './UserAuth';
import {createGameBoard, getSpyCount, GAME_STATUS, ROLES, TEAMS} from './Utils';

import {WORDS} from './words/words.js';
import {AMY_WORDS} from './words/amy_words.js';
import {RAMIS_WORDS} from './words/ramis_words.js';

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
    this.lastGuessedWord = null;
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
    return this.state.gameStatus === GAME_STATUS.NOT_STARTED
      && this._roleTaken(ROLES.BLUE_SPYMASTER)
      && this._roleTaken(ROLES.RED_SPYMASTER)
      && this._roleTaken(ROLES.BLUE_SPY)
      && this._roleTaken(ROLES.RED_SPY);
  }

  startGame() {
    const amyEasterEgg = Object.values(this.state.players).some((playerData) => {
      return playerData.name && playerData.name === 'butthole woman';
    });
    const ramisEasterEgg = Object.values(this.state.players).some((playerData) => {
      return playerData.name && playerData.name === 'Minoru Yamasaki';
    });
    
    let wordsToUse = WORDS;
    if (ramisEasterEgg) {
      wordsToUse = RAMIS_WORDS;
    } else if (amyEasterEgg) {
      wordsToUse = AMY_WORDS;
    }

    const redGoesFirst = Math.random() < 0.5;
    const gameBoardState = createGameBoard(wordsToUse, redGoesFirst);
    const gameRef = firebase.database().ref('games/' + this.props.gameID);
    gameRef.update({
      gameBoardState: gameBoardState,
      gameStatus: redGoesFirst ? GAME_STATUS.RED_TURN : GAME_STATUS.BLUE_TURN,
    });
  }

  switchTurns() {
    if (
      this.state.gameStatus !== GAME_STATUS.BLUE_TURN
      && this.state.gameStatus !== GAME_STATUS.RED_TURN
    ) {
      throw Error('Unexpected call to switchTurns(). Current game status: ' + this.state.gameStatus);
    }
    const gameRef = firebase.database().ref('games/' + this.props.gameID);
    gameRef.update({
      gameStatus: this.state.gameStatus === GAME_STATUS.RED_TURN ? GAME_STATUS.BLUE_TURN : GAME_STATUS.RED_TURN,
    });
  }

  gameWin(team) {
    const gameRef = firebase.database().ref('games/' + this.props.gameID);
    gameRef.update({
      gameStatus: team === TEAMS.BLUE ? GAME_STATUS.BLUE_TEAM_WINS : GAME_STATUS.RED_TEAM_WINS, 
    });
  }

  submitGuess(row, column, role) {
    const guessedWord = this.state.gameBoardState[row][column];
    if (guessedWord.isRevealed) {
      return;
    }

    if (this.lastGuessedWord) {
      const lastGuessedWordRef = firebase.database().ref(
        'games/' + this.props.gameID + '/gameBoardState/' + this.lastGuessedWord[0] + '/' + this.lastGuessedWord[1],
      );
      lastGuessedWordRef.update({
        lastGuessed: false,
      });
    }

    if (
      (guessedWord.team === TEAMS.BLUE && role === ROLES.RED_SPY)
      || (guessedWord.team === TEAMS.RED && role === ROLES.BLUE_SPY)
      || (guessedWord.team === TEAMS.NEUTRAL)
    ) {
      this.switchTurns();
    } else if (guessedWord.team === TEAMS.ASSASSIN) {
      this.gameWin(role === ROLES.RED_SPY ? TEAMS.BLUE : TEAMS.RED);
    } else {
      const counts = getSpyCount(this.state.gameBoardState);
      if (
        (role === ROLES.RED_SPY && counts.red === 1)
        || (role === ROLES.BLUE_SPY && counts.blue === 1)
      ) {
        this.gameWin(role === ROLES.RED_SPY ? TEAMS.RED : TEAMS.BLUE);
      }
    }
    const wordRef = firebase.database().ref('games/' + this.props.gameID + '/gameBoardState/' + row + '/' + column);
    wordRef.update({
      lastGuessed: true,
      isRevealed: true,
    });
    this.lastGuessedWord = [row, column];
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
        <div className="Game-screen App">
          <div>
            <GameInfo
              canStartGame={this._canStartGame()}
              startGame={this.startGame.bind(this)}
              players={this.state.players}
              playerRole={playerRole}
              gameID={this.props.gameID}
              roomCode={this.state.roomCode}
              gameStatus={this.state.gameStatus}
              gameBoardState={this.state.gameBoardState}
            />

          </div>
          <div>
            <GameBoard 
              gameStatus={this.state.gameStatus}
              playerRole={playerRole}
              gameBoardState={this.state.gameBoardState}
              submitGuessCallback={this.submitGuess.bind(this)}
              switchTurns={this.switchTurns.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}
