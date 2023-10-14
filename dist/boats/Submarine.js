"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Submarine = void 0;
const _1 = require("./");
class Submarine extends _1.Boat {
    constructor(key) {
        super(`Submarine-${key}`, 3);
    }
}
exports.Submarine = Submarine;
