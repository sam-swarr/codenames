import React from "react";
import PropTypes from "prop-types";

export default class GameScreen extends React.Component {
  static propTypes = {
    gameID: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
          <p> WELCOME TO GAME {this.props.gameID} </p>
      </div>
    );
  }
}
