"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Speedboat = void 0;
const _1 = require(".");
class Speedboat extends _1.Boat {
    constructor(key) {
        super(`Speedboat-${key}`, 1);
    }
}
exports.Speedboat = Speedboat;
