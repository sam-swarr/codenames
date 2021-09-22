import React from "react";
import PropTypes from "prop-types";

import PlayerRole from './PlayerRole';
import PlayerRoleButton from './PlayerRoleButton';
import {getCurrentUserID} from './UserAuth';
import {ROLES} from './Utils';

import Dropdown from 'react-bootstrap/Dropdown'

import * as firebase from "firebase/app";
import "firebase/database";

export default class PlayerRoleSelector extends React.Component {
  static propTypes = {
    gameID: PropTypes.string,
    players: PropTypes.object,
  };

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
    const playerRole = this.props.players[getCurrentUserID()].role;

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
      <PlayerRole
        isRoleSelectorToggle={true}
        roleSelectorToggleRef={ref}
        roleType={playerRole}
        onRoleSelectorToggleClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      />
    ));

    return (
      <div>
        <div>
          <Dropdown className="Role-selector-dropdown-button">
            <Dropdown.Toggle as={CustomToggle}/>
            <Dropdown.Menu>
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
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    );
  }
}
