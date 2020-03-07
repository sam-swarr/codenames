import React from "react";
import PropTypes from "prop-types";

import {ROLES, TEAMS} from './Utils';

export default class CurrentTurnDisplay extends React.Component {
  static propTypes = {
    currentTurn: PropTypes.oneOf([TEAMS.RED, TEAMS.BLUE]),
    playerRole: PropTypes.oneOf(Object.values(ROLES)),
    onClick: PropTypes.func,
  };

  render() {
    if (
        (this.props.playerRole === ROLES.BLUE_SPYMASTER && this.props.currentTurn === TEAMS.BLUE)
        || (this.props.playerRole === ROLES.RED_SPYMASTER && this.props.currentTurn === TEAMS.RED)
    ) {
        return (
            <div>
                <button onClick={this.props.onClick}>End Turn </button>
            </div>
        );
    } else {
        return null;
    }
  }
}
