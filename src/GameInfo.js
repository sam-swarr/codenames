import React from "react";
import PropTypes from "prop-types";

import {getSpyCount, GAME_STATUS, ROLES, TEAMS} from './Utils';

import GameStatusDisplay from './GameStatusDisplay';
import PlayerList from './PlayerList';
import SpyCountDisplay from './SpyCountDisplay';

export default class GameInfo extends React.Component {
  static propTypes = {
      canStartGame: PropTypes.bool,
      startGame: PropTypes.func,
      gameID: PropTypes.string,
      roomCode: PropTypes.string,
      players: PropTypes.object,
      playerRole: PropTypes.oneOf(Object.values(ROLES)),
      gameStatus: PropTypes.string,
      gameBoardState: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      expanded: true,
    }
  }

  _renderStartGameButton() {
    if (!this.props.canStartGame) {
      return null;
    }
    return (
      <div className="Start-game-button-wrapper">
        <button className="Start-game-button" onClick={this.props.startGame}>Start Game</button>
      </div>
    );
  }

  _onTopClick() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  _getGameStatusWrapperClass() {
    let result = 'Game-status-wrapper';
    if (!this.state.expanded) {
      result += ' player-info-hidden';
    }
    if (this.props.gameStatus === GAME_STATUS.BLUE_TURN) {
      result += ' blue-turn';
    }
    if (this.props.gameStatus === GAME_STATUS.RED_TURN) {
      result += ' red-turn';
    }
    return result;
  }

  render() {
    let blueSpyCount = null;
    let redSpyCount = null;
    if (this.props.gameBoardState) {
      const spyCount = getSpyCount(this.props.gameBoardState);
      blueSpyCount = <SpyCountDisplay team={TEAMS.BLUE} spyCount={spyCount.blue} />;
      redSpyCount = <SpyCountDisplay team={TEAMS.RED} spyCount={spyCount.red} />;
    }

    return (
      <div className="Game-info">
        <div className="Player-info">
          <div className="Game-info-top-bar-wrapper" onClick={this._onTopClick.bind(this)}>
            <div className="Room-code-display-left-spacer"/>
            <div className="Room-code-display-wrapper">
              <p className="Room-code-display"> Room Code: <span className="Room-code-text">{this.props.roomCode}</span></p>
            </div>
            <div className="Player-info-chevron-wrapper">
            <svg className="Player-info-chevron-svg"
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.6569 16.2427L19.0711 14.8285L12.0001 7.75739L4.92896 14.8285L6.34317 16.2427L12.0001 10.5858L17.6569 16.2427Z"
                fill="currentColor"
                display={this.state.expanded ? "inherit" : "none"}
              />
              <path
                d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z"
                fill="currentColor"
                display={!this.state.expanded ? "inherit" : "none"}
              />
            </svg>
            </div>
          </div>
          <div hidden={!this.state.expanded}>
            <PlayerList gameID={this.props.gameID} players={this.props.players} />
          </div>
        </div>
        <div className={this._getGameStatusWrapperClass()}>
          {blueSpyCount}
          <GameStatusDisplay gameStatus={this.props.gameStatus} />
          {redSpyCount}
          {this._renderStartGameButton()}
        </div>
      </div>
    );
  }

}
