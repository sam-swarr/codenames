import React from "react";
import PropTypes from "prop-types";

import PlayerListItem from './PlayerListItem';
import PlayerRoleSelector from './PlayerRoleSelector';

export default class PlayerList extends React.Component {
  static propTypes = {
    gameID: PropTypes.string,
    players: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    console.log("PLAYERS:");
    console.log(this.props.players);
    const list = Object.keys(this.props.players).map(playerID => {
      return <PlayerListItem key={playerID} playerData={this.props.players[playerID]} />;
    });
    return (
      <div>
        <div>
          <p>Players:</p>
        </div>
        <div>
          {list}
        </div>
        <div>
          <PlayerRoleSelector gameID={this.props.gameID} players={this.props.players} />
        </div>
      </div>
    );
  }
}
