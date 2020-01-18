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
    };
  }

  async createNewGame(name) {
    const uid = await loginUser();
    var roomCode = createRoomCode();
    const newGameRef = firebase.database().ref('games').push();
    const players = {};
    players[uid] = {
      uid: uid,
      name: name,
    };
    await newGameRef.update({
      players: players,
      roomCode: roomCode,
    });
    this.setState({
      gameID: newGameRef.getKey(),
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
    const value = snapshot.val();
    if (!value) {
      console.log("NO ROOM FOUND");
    } else {
      console.log("FOUND ROOM");
      console.log(value);
      const gameID = Object.keys(value)[0];
      const newPlayer = {}
      newPlayer[uid] = {
        uid: uid,
        name: name,
      };
      await firebase.database().ref("games/" + gameID + "/players").update(newPlayer);
      this.setState({
        gameID: gameID,
      });
    }
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
        <GameScreen gameID={this.state.gameID} />
      )
    }
  }
}
