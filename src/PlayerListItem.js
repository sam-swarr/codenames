import PlayerRoleSelector from './PlayerRoleSelector';
import {getCurrentUserID} from './UserAuth'

import React from "react";
import PropTypes from "prop-types";

export default class PlayerListItem extends React.Component {
  static propTypes = {
    allPlayers: PropTypes.object,
    gameID: PropTypes.string,
    playerData: PropTypes.object,
  };

  render() {
    const showRoleSelector = 
      (getCurrentUserID() === this.props.playerData.uid)
      && !this.props.playerData.role;
    
    const roleUI = showRoleSelector ?
        <PlayerRoleSelector gameID={this.props.gameID} players={this.props.allPlayers} /> :
        <p>{this.props.playerData.role}</p>;

    return (
      <div className="Player-list-item-wrapper">
        <div className="Player-list-item-name">
          <p>{this.props.playerData.name}</p>
        </div>
        <div className="Player-list-item-role">
            {roleUI}
        </div>
      </div>
    );
  }
}
