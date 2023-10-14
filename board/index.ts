import { Boat } from '../boats';
import { DIRECTIONS, Options } from '../constants';

type Coordinates = {
  x: number;
  y: number;
};

export class Board {
  state: {
    [key: string]: any;
  } = {};

  board: any[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  constructor() {}

  checkBoat(boat: Boat, { x, y }: Coordinates) {
    return this.board[x][y] === boat;
  }

  addBoat(
    boat: Boat,
    { x, y, direction }: Coordinates & { direction: DIRECTIONS }
  ) {
    const length = boat.Length;

    if (direction === DIRECTIONS.DOWN) {
      if (this.checkBoat(boat, { x, y })) {
        throw new Error('Boat already exists in this position');
      }

      for (let i = 0; i < length; i++) {
        this.board[x][y + i] = boat;
      }
    }

    if (direction === DIRECTIONS.RIGHT) {
      if (this.checkBoat(boat, { x, y })) {
        throw new Error('Boat already exists in this position');
      }
      for (let i = 0; i < length; i++) {
        this.board[x + i][y] = boat;
      }
    }

    if (direction === DIRECTIONS.UP) {
      if (this.checkBoat(boat, { x, y })) {
        throw new Error('Boat already exists in this position');
      }
      for (let i = 0; i < length; i++) {
        this.board[x][y - i] = boat;
      }
    }

    if (direction === DIRECTIONS.LEFT) {
      if (this.checkBoat(boat, { x, y })) {
        throw new Error('Boat already exists in this position');
      }
      for (let i = 0; i < length; i++) {
        this.board[x - i][y] = boat;
      }
    }

    this.state[boat.Name] = {
      hits: 0,
      length,
      sunk: false,
    };

    return this.board;
  }
}

export class Player {
  name: string;

  board: Board;
  enemyBoard: Board;

  constructor(name: string) {
    this.name = name;
    this.board = new Board();
    this.enemyBoard = new Board();
  }

  attack(coordinate: Coordinates) {
    const { x, y } = coordinate;
    const attacked = this.board.board[x][y] as Boat;

    this.enemyBoard.board[x][y] = attacked || 'WATER';
    const alreadyAttacked = this.enemyBoard.board[x][y] !== null;
    if (alreadyAttacked) return this.enemyBoard.board[x][y];

    if (attacked) {
      const state = this.board.state[attacked.Name];
      if (state.sunk) return Options.SUNK;

      state.hits++;

      if (state.hits === state.length) {
        state.sunk = true;
        this.board.state[attacked.Name] = state;

        if (
          Object.keys(this.board.state).every(
            (key) => this.board.state[key].sunk
          )
        ) {
          return Options.GAME_WON;
        }

        return Options.SUNK;
      } else {
        this.board.state[attacked.Name] = state;
        return Options.HIT;
      }
    } else {
      return Options.MISS;
    }
  }
}
