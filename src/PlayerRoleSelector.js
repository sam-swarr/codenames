import React from "react";
import PropTypes from "prop-types";

import PlayerRoleButton from './PlayerRoleButton';
import {getCurrentUserID} from './UserAuth';
import {ROLES} from './Utils';

import * as firebase from "firebase/app";
import "firebase/database";

export default class PlayerRoleSelector extends React.Component {
  static propTypes = {
    gameID: PropTypes.string,
    players: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  onClick(roleType) {
    firebase.database().ref(
      "games/" + this.props.gameID + "/players/" + getCurrentUserID()
    ).update({role: roleType});
  }

  _roleTaken(role) {
    return Object.values(this.props.players).some((playerData) => {
      return playerData.role && playerData.role === role;
    });
  }

  render() {
    const doesPlayerHaveRole = !!this.props.players[getCurrentUserID()].role;
    return (
      <div hidden={doesPlayerHaveRole}>
        <PlayerRoleButton
          roleType={ROLES.BLUE_SPYMASTER}
          onClick={this.onClick.bind(this, ROLES.BLUE_SPYMASTER)}
          disabled={this._roleTaken(ROLES.BLUE_SPYMASTER)}
        />
        <PlayerRoleButton
          roleType={ROLES.RED_SPYMASTER}
          onClick={this.onClick.bind(this, ROLES.RED_SPYMASTER)}
          disabled={this._roleTaken(ROLES.RED_SPYMASTER)}
        />
        <PlayerRoleButton
          roleType={ROLES.BLUE_SPY}
          onClick={this.onClick.bind(this, ROLES.BLUE_SPY)}
        />
        <PlayerRoleButton
          roleType={ROLES.RED_SPY}
          onClick={this.onClick.bind(this, ROLES.RED_SPY)}
        />
      </div>
    );
  }
}
