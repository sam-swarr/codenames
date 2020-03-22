import React from "react";
import PropTypes from "prop-types";

import GameBoardWord from './GameBoardWord';
import SubmitGuessButton from './SubmitGuessButton';
import {GAME_STATUS, ROLES} from './Utils';

export default class GameBoard extends React.Component {
  static propTypes = {
    playerRole: PropTypes.oneOf(Object.values(ROLES)),
    gameBoardState: PropTypes.array,
    gameStatus: PropTypes.oneOf(Object.values(GAME_STATUS)),
    submitGuessCallback: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
        highlighted: null,
    };
  }

  onWordClick(row, column) {
    this.setState({
        highlighted: [row, column],
    });
  }

  onSubmitClick() {
    if (!this.state.highlighted) {
        return;
    }
    this.props.submitGuessCallback(
        this.state.highlighted[0],
        this.state.highlighted[1],
        this.props.playerRole,
    );
  }

  render() {
    if (!this.props.gameBoardState) {
        return null;
    }
    const rows = [];
    for (let row = 0; row < this.props.gameBoardState.length; row++) {
        const wordsInRow = [];
        for (let col = 0; col < this.props.gameBoardState[row].length; col++) {
            const wordState = this.props.gameBoardState[row][col];
            const highlighted =
                this.state.highlighted
                && this.state.highlighted[0] === row
                && this.state.highlighted[1] === col;
            wordsInRow.push(
                <GameBoardWord 
                    key={wordState.word}
                    playerRole={this.props.playerRole}
                    wordState={wordState}
                    highlighted={highlighted}
                    onClick={this.onWordClick.bind(this, row, col)} />
            );
        }
        rows.push(
            <div key={row} className="Board-row">
                {wordsInRow}
            </div>
        );
    }
    const isGuesser =
        (this.props.playerRole === ROLES.RED_SPY && this.props.gameStatus === GAME_STATUS.RED_TURN)
        || (this.props.playerRole === ROLES.BLUE_SPY && this.props.gameStatus === GAME_STATUS.BLUE_TURN);
    return (
        <div className="Game-board-wrapper">
            <div>
                {rows}
            </div>
            <div className="Submit-guess-button-wrapper">
                <SubmitGuessButton enabled={isGuesser} onClick={this.onSubmitClick.bind(this)}/>
            </div>
        </div>
    );
  }
}
