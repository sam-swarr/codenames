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

const GAME_BOARD_WIDTH = 5;
const GAME_BOARD_HEIGHT = 5;
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

export function createGameBoard(redGoesFirst) {
  const numWords = GAME_BOARD_WIDTH * GAME_BOARD_HEIGHT;
  let numRed = NUM_WORDS_SECOND_TEAM;
  let numBlue = NUM_WORDS_SECOND_TEAM;
  if (redGoesFirst) {
    numRed = NUM_WORDS_FIRST_TEAM;
  } else {
    numBlue = NUM_WORDS_FIRST_TEAM;
  }

  const shuffledWords = _shuffleArray(WORD_LIST).slice(0, numWords);

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

const WORD_LIST = [
  "Hollywood",
  "Screen",
  "Play",
  "Marble",
  "Dinosaur",
  "Cat",
  "Pitch",
  "Bond",
  "Greece",
  "Deck",
  "Spike",
  "Center",
  "Vacuum",
  "Unicorn",
  "Undertaker",
  "Sock",
  "Loch Ness",
  "Horse",
  "Berlin",
  "Platypus",
  "Port",
  "Chest",
  "Box",
  "Compound",
  "Ship",
  "Watch",
  "Space",
  "Flute",
  "Tower",
  "Death",
  "Well",
  "Fair",
  "Tooth",
  "Staff",
  "Bill",
  "Shot",
  "King",
  "Pan",
  "Square",
  "Buffalo",
  "Scientist",
  "Chick",
  "Atlantis",
  "Spy",
  "Mail",
  "Nut",
  "Log",
  "Pirate",
  "Face",
  "Stick",
  "Disease",
  "Yard",
  "Mount",
  "Slug",
  "Dice",
  "Lead",
  "Hook",
  "Carrot",
  "Poison",
  "Stock",
  "Foot",
  "Torch",
  "Arm",
  "Figure",
  "Mine",
  "Suit",
  "Crane",
  "Beijing",
  "Mass",
  "Microscope",
  "Engine",
  "China",
  "Straw",
  "Pants",
  "Europe",
  "Boot",
  "Princess",
  "Link",
  "Luck",
  "Olive",
  "Palm",
  "Teacher",
  "Thumb",
  "Octopus",
  "Hood",
  "Tie",
  "Doctor",
  "Wake",
  "Cricket",
  "Millionaire",
  "New York",
  "State",
  "Bermuda",
  "Park",
  "Turkey",
  "Chocolate",
  "Trip",
  "Racket",
  "Bat",
  "Jet",
  "Shakespeare",
  "Bolt",
  "Switch",
  "Wall",
  "Soul",
  "Ghost",
  "Time",
  "Dance",
  "Amazon",
  "Grace",
  "Moscow",
  "Pumpkin",
  "Antarctica",
  "Whip",
  "Heart",
  "Table",
  "Ball",
  "Fighter",
  "Cold",
  "Day",
  "Spring",
  "Match",
  "Diamond",
  "Centaur",
  "March",
  "Roulette",
  "Dog",
  "Cross",
  "Wave",
  "Duck",
  "Wind",
  "Spot",
  "Skyscraper",
  "Paper",
  "Apple",
  "Oil",
  "Cook",
  "Fly",
  "Cast",
  "Bear",
  "Pin",
  "Thief",
  "Trunk",
  "America",
  "Novel",
  "Cell",
  "Bow",
  "Model",
  "Knife",
  "Knight",
  "Court",
  "Iron",
  "Whale",
  "Shadow",
  "Contract",
  "Mercury",
  "Conductor",
  "Seal",
  "Car",
  "Ring",
  "Kid",
  "Piano",
  "Laser",
  "Sound",
  "Pole",
  "Superhero",
  "Revolution",
  "Pit",
  "Gas",
  "Glass",
  "Washington",
  "Bark",
  "Snow",
  "Ivory",
  "Pipe",
  "Cover",
  "Degree",
  "Tokyo",
  "Church",
  "Pie",
  "Tube",
  "Block",
  "Comic",
  "Fish",
  "Bridge",
  "Moon",
  "Part",
  "Aztec",
  "Smuggler",
  "Train",
  "Embassy",
  "Pupil",
  "Scuba Diver",
  "Ice",
  "Tap",
  "Code",
  "Shoe",
  "Server",
  "Club",
  "Row",
  "Pyramid",
  "Bug",
  "Penguin",
  "Pound",
  "Himalayas",
  "Czech",
  "Rome",
  "Eye",
  "Board",
  "Bed",
  "Point",
  "France",
  "Mammoth",
  "Cotton",
  "Robin",
  "Net",
  "Bugle",
  "Maple",
  "England",
  "Field",
  "Robot",
  "Plot",
  "Africa",
  "Tag",
  "Mouth",
  "Kiwi",
  "Mole",
  "School",
  "Sink",
  "Pistol",
  "Opera",
  "Mint",
  "Root",
  "Sub",
  "Crown",
  "Back",
  "Plane",
  "Mexico",
  "Cloak",
  "Circle",
  "Tablet",
  "Australia",
  "Green",
  "Egypt",
  "Line",
  "Lawyer",
  "Witch",
  "Parachute",
  "Crash",
  "Gold",
  "Note",
  "Lion",
  "Plastic",
  "Web",
  "Ambulance",
  "Hospital",
  "Spell",
  "Lock",
  "Water",
  "London",
  "Casino",
  "Cycle",
  "Bar",
  "Cliff",
  "Round",
  "Bomb",
  "Giant",
  "Hand",
  "Ninja",
  "Rose",
  "Slip",
  "Limousine",
  "Pass",
  "Theater",
  "Plate",
  "Satellite",
  "Ketchup",
  "Hotel",
  "Tail",
  "Tick",
  "Ground",
  "Police",
  "Dwarf",
  "Fan",
  "Dress",
  "Saturn",
  "Grass",
  "Brush",
  "Chair",
  "Rock",
  "Pilot",
  "Telescope",
  "File",
  "Lab",
  "India",
  "Ruler",
  "Nail",
  "Swing",
  "Olympus",
  "Change",
  "Date",
  "Stream",
  "Missile",
  "Scale",
  "Band",
  "Angel",
  "Press",
  "Berry",
  "Card",
  "Check",
  "Draft",
  "Head",
  "Lap",
  "Orange",
  "Ice Cream",
  "Film",
  "Washer",
  "Pool",
  "Shark",
  "Van",
  "String",
  "Calf",
  "Hawk",
  "Eagle",
  "Needle",
  "Forest",
  "Dragon",
  "Key",
  "Belt",
  "Cap",
  "Drill",
  "Glove",
  "Paste",
  "Fall",
  "Fire",
  "Spider",
  "Spine",
  "Soldier",
  "Horn",
  "Queen",
  "Ham",
  "Litter",
  "Life",
  "Temple",
  "Rabbit",
  "Button",
  "Game",
  "Star",
  "Jupiter",
  "Vet",
  "Night",
  "Air",
  "Battery",
  "Genius",
  "Shop",
  "Bottle",
  "Stadium",
  "Alien",
  "Light",
  "Triangle",
  "Lemon",
  "Nurse",
  "Drop",
  "Track",
  "Bank",
  "Germany",
  "Worm",
  "Ray",
  "Capital",
  "Strike",
  "War",
  "Concert",
  "Honey",
  "Canada",
  "Buck",
  "Snowman",
  "Beat",
  "Jam",
  "Copper",
  "Beach",
  "Bell",
  "Leprechaun",
  "Phoenix",
  "Force",
  "Boom",
  "Fork",
  "Alps",
  "Post",
  "Fence",
  "Kangaroo",
  "Mouse",
  "Mug",
  "Horseshoe",
  "Scorpion",
  "Agent",
  "Helicopter",
  "Hole",
  "Organ",
  "Jack",
  "Charge",
];
