import React from "react";
import PropTypes from "prop-types";

export default class GameBoardWord extends React.Component {
  static propTypes = {
    wordState: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Board-word-wrapper">
        <p className="Board-word"> {this.props.wordState.word} </p>
      </div>
    );
  }
}
