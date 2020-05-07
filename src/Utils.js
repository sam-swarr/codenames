export const ROLES = {
  BLUE_SPYMASTER: 'BLUE_SPYMASTER',
  RED_SPYMASTER: 'RED_SPYMASTER',
  BLUE_SPY: 'BLUE_SPY',
  RED_SPY: 'RED_SPY',
}

export function isSpymaster(role) {
  return role === ROLES.BLUE_SPYMASTER || role === ROLES.RED_SPYMASTER;
}

export const TEAMS = {
  BLUE: 'BLUE',
  RED: 'RED',
  NEUTRAL: 'NEUTRAL',
  ASSASSIN: 'ASSASSIN',
}

export const GAME_STATUS = {
  NOT_STARTED: 'NOT_STARTED',
  BLUE_TURN: 'BLUE_TURN',
  RED_TURN: 'RED_TURN',
  BLUE_TEAM_WINS: 'BLUE_TEAM_WINS',
  RED_TEAM_WINS: 'RED_TEAM_WINS',
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
      return 'Selecting Role...';
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

const GAME_BOARD_WIDTH = 4;
const GAME_BOARD_HEIGHT = 6;
const NUM_WORDS_FIRST_TEAM = 9;
const NUM_WORDS_SECOND_TEAM = 8;

function _shuffleArray(array) {
    array = array.slice();
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

export function findLastGuessedWord(gameBoardState) {
  for (let currRow = 0; currRow < GAME_BOARD_HEIGHT; currRow++) {
    for (let currColumn = 0; currColumn < GAME_BOARD_WIDTH; currColumn++) {
      if (gameBoardState[currRow][currColumn].lastGuessed) {
        return [currRow, currColumn];
      }
    }
  }
  return null;
}

export function createGameBoard(wordList, redGoesFirst) {
  const numWords = GAME_BOARD_WIDTH * GAME_BOARD_HEIGHT;
  let numRed = NUM_WORDS_SECOND_TEAM;
  let numBlue = NUM_WORDS_SECOND_TEAM;
  if (redGoesFirst) {
    numRed = NUM_WORDS_FIRST_TEAM;
  } else {
    numBlue = NUM_WORDS_FIRST_TEAM;
  }

  const shuffledWords = _shuffleArray(wordList).slice(0, numWords);

  const teamAssignments = new Array(numWords);
  teamAssignments.fill(TEAMS.NEUTRAL);
  teamAssignments.fill(TEAMS.RED, 0, numRed);
  teamAssignments.fill(TEAMS.BLUE, numRed, numRed + numBlue);
  teamAssignments[numRed + numBlue] = TEAMS.ASSASSIN;
  const shuffledTeamAssignments = _shuffleArray(teamAssignments);

  const gameBoard = [];
  for (let i = 0; i < GAME_BOARD_HEIGHT; i++) {
    const row = [];
    for (let j = 0; j < GAME_BOARD_WIDTH; j++) {
      row[j] = {
        word: shuffledWords.pop(),
        team: shuffledTeamAssignments.pop(),
        isRevealed: false,
        lastGuessed: false,
      };
    }
    gameBoard[i] = row;
  }
  return gameBoard;
}

export function getSpyCount(gameBoardState) {
  let blue = 0;
  let red = 0;
  for (let i = 0; i < gameBoardState.length; i++) {
      for (let j = 0; j < gameBoardState[i].length; j++) {
          const currWord = gameBoardState[i][j];
          if (!currWord.isRevealed) {
              if (currWord.team === TEAMS.BLUE) {
                  blue++;
              } else if (currWord.team === TEAMS.RED) {
                  red++;
              }
          }
      }
  }
  return {
      blue: blue,
      red: red,
  };
}
