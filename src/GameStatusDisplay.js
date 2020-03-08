import React from "react";
import PropTypes from "prop-types";

import {GAME_STATUS} from './Utils';

export default class GameStatusDisplay extends React.Component {
  static propTypes = {
    gameStatus: PropTypes.oneOf(Object.values(GAME_STATUS)),
  };

  render() {
    const status = this.props.gameStatus;
    if (!status || status === GAME_STATUS.NOT_STARTED) {
      return null;
    }

    let text;
    switch (this.props.gameStatus) {
      case GAME_STATUS.BLUE_TURN:
        text = 'Blue Team\'s Turn';
        break;
      case GAME_STATUS.RED_TURN:
        text = 'Red Team\'s Turn';
        break;
      case GAME_STATUS.BLUE_TEAM_WINS:
        text = 'Blue Team Wins!';
        break;
      case GAME_STATUS.RED_TEAM_WINS:
        text = 'Red Team Wins!';
        break;
      default:
        throw Error('Unhandle game status.');
    }

    return (
      <div>
        <p>{text}</p>
      </div>
    );
  }
}
