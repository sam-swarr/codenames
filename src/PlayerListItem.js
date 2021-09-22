import PlayerRole from './PlayerRole';
import PlayerRoleSelector from './PlayerRoleSelector';
import {getCurrentUserID} from './UserAuth'

import React from "react";
import PropTypes from "prop-types";

export default class PlayerListItem extends React.Component {
  static propTypes = {
    allPlayers: PropTypes.object,
    darkCSS: PropTypes.bool,
    gameID: PropTypes.string,
    playerData: PropTypes.object,
  };

  render() {
    const showRoleSelector = (getCurrentUserID() === this.props.playerData.uid);
    
    const roleUI = showRoleSelector ?
        <PlayerRoleSelector gameID={this.props.gameID} players={this.props.allPlayers}/> :
        <PlayerRole isRoleSelectorToggle={showRoleSelector} roleType={this.props.playerData.role}/>;

    let wrapperClass = "Player-list-item-wrapper";
    if (this.props.darkCSS) {
      wrapperClass += " darkrow";
    }

    return (
      <div className={wrapperClass}>
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
