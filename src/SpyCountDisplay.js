import React from "react";
import PropTypes from "prop-types";

import bluespy from './images/spylogo-blue-small.png';
import redspy from './images/spylogo-red-small.png';

import {TEAMS} from './Utils';

export default class SpyCountDisplay extends React.Component {
  static propTypes = {
    team: PropTypes.oneOf([TEAMS.RED, TEAMS.BLUE]),
    spyCount: PropTypes.number,
  };

  _getImgSource(team) {
    switch (team) {
      case TEAMS.BLUE:
        return bluespy;
      case TEAMS.RED:
        return redspy;
      default:
        throw Error('Unknown team: ' + team);
    }
  }

  render() {
    return (
      <div className={'Spy-count-wrapper'}>
        <img src={this._getImgSource(this.props.team)} className="Spy-count-img" alt="logo"/>
        <div className={'Spy-count-number'}>
          {this.props.spyCount}
        </div>
      </div>
    );
  }
}
