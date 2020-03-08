import React from "react";
import PropTypes from "prop-types";

import {TEAMS} from './Utils';

export default class SpyCountDisplay extends React.Component {
  static propTypes = {
    gameBoardState: PropTypes.array,
  };

  _getSpyCount() {
    let blue = 0;
    let red = 0;
    for (let i = 0; i < this.props.gameBoardState.length; i++) {
        for (let j = 0; j < this.props.gameBoardState[i].length; j++) {
            const currWord = this.props.gameBoardState[i][j];
            if (!currWord.isRevealed) {
                if (currWord.team === TEAMS.BLUE) {
                    blue++;
                } else if (currWord.team === TEAMS.RED) {
                    red++;
                }
            }
        }
    }
    return {
        blue: blue,
        red: red,
    };
  }

  render() {
    if (!this.props.gameBoardState) {
        return null;
    }

    const counts = this._getSpyCount();
    return (
      <div>
        <div>
            <p>Spy's Remaining:</p>
        </div>
        <div>
            <p>Blue: {counts.blue}</p>
        </div>
        <div>
            <p>Red: {counts.red}</p>
        </div>
      </div>
    );
  }
}
