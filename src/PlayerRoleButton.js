import React from "react";
import PropTypes from "prop-types";

import {getRoleLabel} from './Utils';

export default class PlayerRoleButton extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    roleType: PropTypes.string,
    onClick: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={this.props.onClick} disabled={this.props.disabled}>
            {getRoleLabel(this.props.roleType)}
          </button>
        </div>
      </div>
    );
  }
}
