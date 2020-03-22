import React from "react";
import PropTypes from "prop-types";

import bluespy from './images/spylogo-blue-small.png';
import bluespymaster from './images/spylogo-blue-spymaster-small.png';
import redspy from './images/spylogo-red-small.png';
import redspymaster from './images/spylogo-red-spymaster-small.png';
import {getRoleLabel, ROLES} from './Utils';

export default class PlayerRole extends React.Component {
  static propTypes = {
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

    return (
        <div className={"Player-role-selector-button-contents-wrapper"}>
            <div className={labelWrapperClass}>
                <div className={"Player-role-selector-label"}>
                <p>{getRoleLabel(this.props.roleType)}</p>
                </div>
            </div>
            {roleLogo}
        </div>
    );
  }
}
