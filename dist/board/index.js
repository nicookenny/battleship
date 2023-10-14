"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = exports.Board = void 0;
const constants_1 = require("../constants");
class Board {
    constructor() {
        this.state = {};
        this.board = new Array(10).fill(0).map(() => new Array(10)
            .fill(0)
            .fill(0)
            .map(() => null));
    }
    checkBoat(boat, { x, y }) {
        return this.board[x][y] === boat;
    }
    addBoat(boat, { x, y, direction }) {
        const length = boat.Length;
        if (direction === constants_1.DIRECTIONS.DOWN) {
            if (this.checkBoat(boat, { x, y })) {
                throw new Error('Boat already exists in this position');
            }
            for (let i = 0; i < length; i++) {
                this.board[x][y + i] = boat;
            }
        }
        if (direction === constants_1.DIRECTIONS.RIGHT) {
            if (this.checkBoat(boat, { x, y })) {
                throw new Error('Boat already exists in this position');
            }
            for (let i = 0; i < length; i++) {
                this.board[x + i][y] = boat;
            }
        }
        if (direction === constants_1.DIRECTIONS.UP) {
            if (this.checkBoat(boat, { x, y })) {
                throw new Error('Boat already exists in this position');
            }
            for (let i = 0; i < length; i++) {
                this.board[x][y - i] = boat;
            }
        }
        if (direction === constants_1.DIRECTIONS.LEFT) {
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
exports.Board = Board;
class Player {
    constructor(name) {
        this.name = name;
        this.board = new Board();
        this.enemyBoard = new Board();
    }
    attack(coordinate) {
        const { x, y } = coordinate;
        const attacked = this.board.board[x][y];
        this.enemyBoard.board[x][y] = attacked || 'WATER';
        if (attacked) {
            const state = this.board.state[attacked.Name];
            if (state.sunk)
                return constants_1.Options.SUNK;
            state.hits++;
            if (state.hits === state.length) {
                state.sunk = true;
                this.board.state[attacked.Name] = state;
                if (Object.keys(this.board.state).every((key) => this.board.state[key].sunk)) {
                    return constants_1.Options.GAME_WON;
                }
                console.log({
                    'POST SUNK': this.enemyBoard.board,
                });
                return constants_1.Options.SUNK;
            }
            else {
                this.board.state[attacked.Name] = state;
                return constants_1.Options.HIT;
            }
        }
        else {
            return constants_1.Options.MISS;
        }
    }
}
exports.Player = Player;
