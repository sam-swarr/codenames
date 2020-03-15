import React from "react";
import PropTypes from "prop-types";

export default class Button extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    onClick: PropTypes.func,
  };

  handleClick = () => {
    this.props.onClick();
  };

  render() {
    return (
      <div>
        <button className={this.props.className} onClick={this.handleClick}>{this.props.name}</button>
      </div>
    );
  }
}
