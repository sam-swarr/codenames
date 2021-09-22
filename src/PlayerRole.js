import React from "react";
import PropTypes from "prop-types";

import bluespy from './images/spylogo-blue-small.png';
import bluespymaster from './images/spylogo-blue-spymaster-small.png';
import redspy from './images/spylogo-red-small.png';
import redspymaster from './images/spylogo-red-spymaster-small.png';
import {getRoleLabel, ROLES} from './Utils';

export default class PlayerRole extends React.Component {
  static propTypes = {
    onRoleSelectorToggleClick: PropTypes.func,
    isRoleSelectorToggle: PropTypes.bool,
    roleType: PropTypes.string,
  };

  _getImgSource(roleType) {
    switch (roleType) {
      case ROLES.BLUE_SPYMASTER:
        return bluespymaster;
      case ROLES.RED_SPYMASTER:
        return redspymaster;
      case ROLES.BLUE_SPY:
        return bluespy;
      case ROLES.RED_SPY:
        return redspy;
      default:
        throw Error('Unknown role: ' + roleType);
    }
  }

  _getLabel() {
    if (this.props.isRoleSelectorToggle && !this.props.roleType) {
      return "Select Role";
    }
    return getRoleLabel(this.props.roleType);
  }

  render() {
    const roleLogo = this.props.roleType ?
        <div className="Role-selector-logo-wrapper">
            <img src={this._getImgSource(this.props.roleType)} className="Role-selector-logo" alt="logo"/>
        </div> :
        null;

    let labelWrapperClass = "Player-role-selector-label-wrapper";
    if (this.props.roleType == null) {
        labelWrapperClass += " no-role";
    }
    if (this.props.isRoleSelectorToggle) {
        labelWrapperClass += " dark-font";
    }

    return (
        <div
          className={"Player-role-selector-button-contents-wrapper"}
          ref={this.props.roleSelectorToggleRef}
          onClick={(e) => {
            if (this.props.isRoleSelectorToggle) {
              this.props.onRoleSelectorToggleClick(e);
            }
          }}>
            <div className={labelWrapperClass}>
                <div className={"Player-role-selector-label"}>
                  <p>{this._getLabel()}</p>
                </div>
            </div>
            {roleLogo}
        </div>
    );
  }
}
