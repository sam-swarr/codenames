import PlayerRole from './PlayerRole';
import PlayerRoleSelector from './PlayerRoleSelector';
import {getCurrentUserID} from './UserAuth'
import {GAME_STATUS} from './Utils';


import React from "react";
import PropTypes from "prop-types";

export default class PlayerListItem extends React.Component {
  static propTypes = {
    allPlayers: PropTypes.object,
    darkCSS: PropTypes.bool,
    gameID: PropTypes.string,
    gameStatus: PropTypes.string,
    playerData: PropTypes.object,
  };

  render() {
    // Only show the role selector for your own name *and* only if the game hasn't started
    // or if you don't have a role yet (e.g. you left the game and rejoined).
    const showRoleSelector = (getCurrentUserID() === this.props.playerData.uid)
      && (this.props.gameStatus === GAME_STATUS.NOT_STARTED || !this.props.playerData.role);
    
    const roleUI = showRoleSelector ?
        <PlayerRoleSelector gameID={this.props.gameID} players={this.props.allPlayers}/> :
        <PlayerRole isRoleSelectorToggle={false} roleType={this.props.playerData.role}/>;

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
