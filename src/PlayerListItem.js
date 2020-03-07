import React from "react";
import PropTypes from "prop-types";

export default class PlayerListItem extends React.Component {
  static propTypes = {
    playerData: PropTypes.object,
  };

  render() {
    return (
      <div>
        <div>
          <p>{this.props.playerData.name} -- {this.props.playerData.role}</p>
        </div>
      </div>
    );
  }
}
