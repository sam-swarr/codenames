import React from "react";
import PropTypes from "prop-types";

import PlayerListItem from './PlayerListItem';

export default class PlayerList extends React.Component {
  static propTypes = {
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
      </div>
    );
  }
}
