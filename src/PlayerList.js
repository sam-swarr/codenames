import React from "react";
import PropTypes from "prop-types";

import PlayerListItem from './PlayerListItem';

export default class PlayerList extends React.Component {
  static propTypes = {
    gameID: PropTypes.string,
    players: PropTypes.object,
  };

  render() {
    const list = Object.keys(this.props.players).map(playerID => {
      return <PlayerListItem key={playerID} allPlayers={this.props.players} gameID={this.props.gameID} playerData={this.props.players[playerID]} />;
    });
    return (
      <div className={"Player-list-wrapper"}>
        <div>
          {list}
        </div>
      </div>
    );
  }
}
