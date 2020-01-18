import React from 'react';
import logo from './logo.svg';
import './App.css';

import Button from './Button';
import StartGameForm from './StartGameForm';

import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyBZ_Wbk_jIt_Elj9UTAv5LVR8RXi59mbvw",
  authDomain: "codenames-189d7.firebaseapp.com",
  databaseURL: "https://codenames-189d7.firebaseio.com",
  projectId: "codenames-189d7",
  storageBucket: "codenames-189d7.appspot.com",
  messagingSenderId: "351390413939",
  appId: "1:351390413939:web:252fe2ca78048dd933e606",
  measurementId: "G-MRVTVQKK8T"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function createRoomCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var result = "";
  for (var i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function createNewGame(name) {
  firebase.auth().signInAnonymously().then((userCredential) => {
    const uid = userCredential.user.uid;
    var roomCode = createRoomCode();
    console.log('READY TO CREATE GAME');
    console.log(uid);
    console.log(name);
    console.log(roomCode);

    const newGameRef = firebase.database().ref('games').push();
    const players = {};
    players[uid] = {
      name: name,
    };
    return newGameRef.update({
      players: players,
      roomCode: roomCode,
    });
  });
}

function joinGame(name, roomCode) {
  firebase.auth().signInAnonymously().then((userCredential) => {
    const uid = userCredential.user.uid;
    const roomCodeUpper = roomCode.toUpperCase();
    console.log('READY TO JOIN GAME');
    console.log(uid);
    console.log(name);
    console.log(roomCodeUpper);
    firebase.database().ref('games')
      .orderByChild("roomCode")
      .equalTo(roomCodeUpper)
      .limitToLast(1)
      .once('value').then((snapshot) => {
        const value = snapshot.val();
        if (!value) {
          console.log("NO ROOM FOUND");
        } else {
          console.log("FOUND ROOM");
          console.log(value);
          const gameID = Object.keys(value)[0];
          const newPlayer = {}
          newPlayer[uid] = {
            name: name,
          };
          const gameRef = firebase.database().ref("games/" + gameID + "/players")
            .update(newPlayer).then(() => {
              console.log(`ADDED PLAYER {uid} TO GAME {gameID}`);
            });
        }
      });
  })
}

function logoutUser() {
  firebase.auth().signOut().then(() => {console.log("LOGOUT");});
}

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Button name="Logout" onClick={logoutUser}/>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Agent Appellations!
          </p>
          <StartGameForm onCreateGameClick={createNewGame} onJoinGameClick={joinGame}/>
        </header>
      </div>
    );
  }
}
