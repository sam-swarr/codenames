import React from "react";
import PropTypes from "prop-types";

import PlayerList from './PlayerList';
import {getCurrentUserID} from './UserAuth';

import * as firebase from "firebase/app";
import "firebase/database";

export default class GameScreen extends React.Component {
  static propTypes = {
    gameID: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      players: {},
    }
    this.removeUser = this.removeUserFromGame.bind(this);
  }

  async removeUserFromGame() {
    console.log("REMOVE USER");
    debugger;
    const currentPlayerRef = firebase.database()
      .ref('games/' + this.props.gameID + '/players/' + getCurrentUserID());
    await currentPlayerRef.remove();
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.removeUser);
    const gameRef = firebase.database().ref('games/' + this.props.gameID);
    gameRef.on('value', snapshot => {
      this.setState(snapshot.val());
    });
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.removeUser);
  }

  render() {
    console.log("STATE: ");
    console.log(this.state);
    return (
      <div>
          <p> Room Code: {this.state.roomCode} </p>
          <PlayerList players={this.state.players} />
      </div>
    );
  }
}
