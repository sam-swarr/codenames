import React from "react";
import PropTypes from "prop-types";

import {GAME_STATUS, ROLES} from './Utils';

export default class EndTurnButton extends React.Component {
  static propTypes = {
    gameStatus: PropTypes.oneOf(Object.values(GAME_STATUS)),
    playerRole: PropTypes.oneOf(Object.values(ROLES)),
    onClick: PropTypes.func,
  };

  render() {
    if (
        (this.props.playerRole === ROLES.BLUE_SPYMASTER && this.props.gameStatus === GAME_STATUS.BLUE_TURN)
        || (this.props.playerRole === ROLES.RED_SPYMASTER && this.props.gameStatus === GAME_STATUS.RED_TURN)
    ) {
        return (
            <div>
                <button className="End-turn-button" onClick={this.props.onClick}>End Turn</button>
            </div>
        );
    } else {
        return null;
    }
  }
}
