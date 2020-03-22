import React from "react";
import PropTypes from "prop-types";

import {isSpymaster, ROLES, TEAMS} from './Utils';

export default class GameBoardWord extends React.Component {
  static propTypes = {
    playerRole: PropTypes.oneOf(Object.values(ROLES)),
    wordState: PropTypes.object,
    onClick: PropTypes.func,
    highlighted: PropTypes.bool,
    lastGuessed: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  _getCSSClasses() {
    const classes = ['Board-word-wrapper'];
    if (this.props.highlighted) {
      classes.push('highlighted');
    }
    if (this.props.lastGuessed) {
      classes.push('last-guessed');
    }
    if (this.props.wordState.isRevealed) {
      classes.push('revealed');
    }
    if (isSpymaster(this.props.playerRole) || this.props.wordState.isRevealed) {
      switch (this.props.wordState.team) {
        case TEAMS.RED:
          classes.push('Red-word');
          break;
        case TEAMS.BLUE:
          classes.push('Blue-word');
          break;
        case TEAMS.ASSASSIN:
          classes.push('Assassin-word');
          break;
        default:
          break;
      }
    }
    return classes;
  }

  render() {
    return (
      <div className={this._getCSSClasses().join(' ')} onClick={this.props.onClick}>
        <div className={'Board-word-text-wrapper'}>
          <p className="Board-word"> {this.props.wordState.word} </p>
        </div>
      </div>
    );
  }
}
