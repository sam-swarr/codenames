import React from "react";
import PropTypes from "prop-types";

export default class SubmitGameButton extends React.Component {
  static propTypes = {
    enabled: PropTypes.bool,
    onClick: PropTypes.func,
  };

  render() {
    const classes = ['Submit-guess-button'];
    if (!this.props.enabled) {
        classes.push('disabled');
    }
    return (
      <div>
        <button
            className={classes.join(" ")}
            onClick={this.props.enabled ? this.props.onClick : null}>
                Submit Guess
        </button>
      </div>
    );
  }
}
