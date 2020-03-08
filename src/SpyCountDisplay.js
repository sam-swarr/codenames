import React from "react";
import PropTypes from "prop-types";

import {getSpyCount} from './Utils';

export default class SpyCountDisplay extends React.Component {
  static propTypes = {
    gameBoardState: PropTypes.array,
  };

  render() {
    if (!this.props.gameBoardState) {
        return null;
    }

    const counts = getSpyCount(this.props.gameBoardState);
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
