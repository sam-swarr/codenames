import React from 'react';
import logo from './logo.svg';
import './App.css';

import Button from './Button';
import StartGameForm from './StartGameForm';
import GameScreen from './GameScreen';
import {loginUser} from './UserAuth';
import {FIREBASE_CONFIG} from './FirebaseConfig.js';
import {createRoomCode} from './Utils.js';

import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

// Initialize Firebase
firebase.initializeApp(FIREBASE_CONFIG);

function logoutUser() {
  firebase.auth().signOut().then(() => {console.log("LOGOUT");});
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameID: null,
      initialGameState: {},
    };
  }

  async createNewGame(name) {
    const uid = await loginUser();
    var roomCode = createRoomCode();
    const newGameRef = firebase.database().ref('games').push();
    // const players = {};
    const players = {
      test_player_1: {
        name: 'bob',
        role: 'RED_SPYMASTER',
        uid: 'test_player_1',
      },
      test_player_2: {
        name: 'joe',
        role: 'RED_SPY',
        uid: 'test_player_2',
      },
      test_player_3: {
        name: 'fred',
        role: 'BLUE_SPY',
        uid: 'test_player_3',
      }
    };
    players[uid] = {
      uid: uid,
      name: name,
    };
    const newGameState = {
      players: players,
      roomCode: roomCode,
    };
    await newGameRef.update(newGameState);
    this.setState({
      gameID: newGameRef.getKey(),
      initialGameState: newGameState,
    });
  }

  async joinExistingGame(name, roomCode) {
    const uid = await loginUser();
    const roomCodeUpper = roomCode.toUpperCase();
    const snapshot = await firebase.database().ref('games')
      .orderByChild("roomCode")
      .equalTo(roomCodeUpper)
      .limitToLast(1)
      .once('value');
    const gamesQueryResult = snapshot.val();
    if (!gamesQueryResult) {
      console.log("NO ROOM FOUND");
    } else {
      console.log("FOUND ROOM");
      console.log(gamesQueryResult);
      const gameID = Object.keys(gamesQueryResult)[0];
      const newPlayer = {}
      newPlayer[uid] = {
        uid: uid,
        name: name,
      };
      const newGameState = gamesQueryResult[gameID];
      newGameState.players = {
        ...newGameState.players,
        ...newPlayer,
      };
      await firebase.database().ref("games/" + gameID + "/players").update(newPlayer);
      this.setState({
        gameID: gameID,
        initialGameState: newGameState,
      });
    }
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

  render() {
    if (!this.state.gameID) {
      return (
        <div className="App">
          <header className="App-header">
            <Button name="Logout" onClick={logoutUser}/>
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Agent Appellations!
            </p>
            <StartGameForm
              onCreateGameClick={this.createNewGame.bind(this)}
              onJoinGameClick={this.joinExistingGame.bind(this)}
            />
          </header>
        </div>
      );
    } else {
      return (
        <GameScreen gameID={this.state.gameID} initialGameState={this.state.initialGameState} />
      )
    }
  }
}
