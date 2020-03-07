import React from "react";
import PropTypes from "prop-types";

import GameBoardWord from './GameBoardWord';
import {ROLES} from './Utils';

export default class GameBoard extends React.Component {
  static propTypes = {
    playerRole: PropTypes.oneOf(Object.values(ROLES)),
    gameBoardState: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (!this.props.gameBoardState) {
        return null;
    }
    const rows = [];
    for (let i = 0; i < this.props.gameBoardState.length; i++) {
        const row = this.props.gameBoardState[i].map(wordState => {
            return <GameBoardWord key={wordState.word} playerRole={this.props.playerRole} wordState={wordState} />;
        })
        rows.push(
            <div key={i} className="Board-row">
                {row}
            </div>
        );
    }
    return (
      <div>
        {rows}
      </div>
    );
  }
}
