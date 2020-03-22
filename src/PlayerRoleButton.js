import React from "react";
import PropTypes from "prop-types";

import PlayerRole from './PlayerRole';

export default class PlayerRoleButton extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    roleType: PropTypes.string,
    onClick: PropTypes.func,
  };

  render() {
    return (
      <div className="Player-role-button-wrapper">
        <button className="Player-role-button" onClick={this.props.onClick} disabled={this.props.disabled}>
          <PlayerRole roleType={this.props.roleType} />
        </button>
      </div>
    );
  }
}
