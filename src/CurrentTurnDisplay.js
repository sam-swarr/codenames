import React from "react";
import PropTypes from "prop-types";

import {TEAMS} from './Utils';

export default class CurrentTurnDisplay extends React.Component {
  static propTypes = {
    currentTurn: PropTypes.oneOf([TEAMS.RED, TEAMS.BLUE]),
  };

  render() {
    if (!this.props.currentTurn) {
        return null;
    }
    return (
      <div>
        <p>{this.props.currentTurn === TEAMS.RED ? 'Red Team\'s Turn' : 'Blue Team\'s Turn'}</p>
      </div>
    );
  }
}
