
export const ROLES = {
  BLUE_SPYMASTER: 'BLUE_SPYMASTER',
  RED_SPYMASTER: 'RED_SPYMASTER',
  BLUE_SPY: 'BLUE_SPY',
  RED_SPY: 'RED_SPY',
}

export function getRoleLabel(role) {
  switch (role) {
    case ROLES.BLUE_SPYMASTER:
      return 'Blue Spymaster';
    case ROLES.RED_SPYMASTER:
      return 'Red Spymaster';
    case ROLES.BLUE_SPY:
      return 'Blue Spy';
    case ROLES.RED_SPY:
      return 'Red Spy';
    default:
      throw Error('Unknown role constant: ' + role);
  }
}

export function createRoomCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var result = "";
  for (var i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
