"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const board_1 = require("./board");
const AircraftCarrier_1 = require("./boats/AircraftCarrier");
const constants_1 = require("./constants");
const inquirer_1 = __importDefault(require("inquirer"));
const play = () => __awaiter(void 0, void 0, void 0, function* () {
    var e_1, _a, e_2, _b;
    const name1 = yield inquirer_1.default.prompt({
        type: 'input',
        name: 'name',
        message: 'Player 1 name:',
    });
    const name2 = yield inquirer_1.default.prompt({
        type: 'input',
        name: 'name',
        message: 'Player 2 name:',
    });
    const player1 = new board_1.Player(name1.name);
    const player2 = new board_1.Player(name2.name);
    const aircraftCarrier1 = new AircraftCarrier_1.AircraftCarrier(1);
    const boats = [aircraftCarrier1];
    try {
        for (var boats_1 = __asyncValues(boats), boats_1_1; boats_1_1 = yield boats_1.next(), !boats_1_1.done;) {
            let boat = boats_1_1.value;
            const { x, y, direction } = yield inquirer_1.default.prompt([
                {
                    type: 'number',
                    name: 'x',
                    message: `${player1.name} enter x coordinate for ${boat.Name}:`,
                },
                {
                    type: 'number',
                    name: 'y',
                    message: `${player1.name} enter y coordinate for ${boat.Name}:`,
                },
                {
                    type: 'list',
                    name: 'direction',
                    message: `${player1.name} enter direction for ${boat.Name}:`,
                    choices: Object.values(constants_1.DIRECTIONS),
                },
            ]);
            player1.board.addBoat(boat, { x, y, direction });
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (boats_1_1 && !boats_1_1.done && (_a = boats_1.return)) yield _a.call(boats_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    try {
        for (var boats_2 = __asyncValues(boats), boats_2_1; boats_2_1 = yield boats_2.next(), !boats_2_1.done;) {
            let boat = boats_2_1.value;
            const { x, y, direction } = yield inquirer_1.default.prompt([
                {
                    type: 'number',
                    name: 'x',
                    message: `${player2.name} enter x coordinate for ${boat.Name}:`,
                },
                {
                    type: 'number',
                    name: 'y',
                    message: `${player2.name} enter y coordinate for ${boat.Name}:`,
                },
                {
                    type: 'list',
                    name: 'direction',
                    message: `${player2.name} enter direction for ${boat.Name}:`,
                    choices: Object.values(constants_1.DIRECTIONS),
                },
            ]);
            player2.board.addBoat(boat, { x, y, direction });
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (boats_2_1 && !boats_2_1.done && (_b = boats_2.return)) yield _b.call(boats_2);
        }
        finally { if (e_2) throw e_2.error; }
    }
    console.log({ payer1: player1.board, player2: player2.board });
    let currentPlayer = player1;
    const win = false;
    while (!win) {
        const { x, y } = yield inquirer_1.default.prompt([
            {
                type: 'number',
                name: 'x',
                message: `${currentPlayer.name} enter x coordinate:`,
            },
            {
                type: 'number',
                name: 'y',
                message: `${currentPlayer.name} enter y coordinate:`,
            },
        ]);
        let result;
        if (currentPlayer === player1) {
            result = player2.attack({ x, y });
        }
        else {
            result = player1.attack({ x, y });
        }
        console.log({ result });
        if (result === 'GAME_WON') {
            console.log(`${currentPlayer.name} won the game!`);
            break;
        }
        if (result === 'MISS') {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
        }
    }
    console.log('Winner is: ', currentPlayer.name);
});
play();
// console.log(player1.attack({ x: 0, y: 0 }));
// console.log(player1.attack({ x: 0, y: 1 }));
// console.log(player1.attack({ x: 1, y: 3 }));
// console.log(player1.attack({ x: 1, y: 4 }));
// console.log(player1.attack({ x: 5, y: 1 }));
// console.log(player1.attack({ x: 5, y: 2 }));
// console.log(player1.attack({ x: 5, y: 3 }));
// console.log(player1.attack({ x: 5, y: 4 }));
// console.log(player1.attack({ x: 5, y: 5 }));
// console.log(player1.attack({ x: 5, y: 6 }));
// console.log(player1.attack({ x: 5, y: 7 }));
// console.log(player1.attack({ x: 5, y: 8 }));
// console.log(player1.attack({ x: 5, y: 9 }));
// console.log({ state: player1.board.state });
