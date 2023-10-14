"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cruise = void 0;
const _1 = require(".");
class Cruise extends _1.Boat {
    constructor(key) {
        super(`Cruise-${key}`, 2);
    }
}
exports.Cruise = Cruise;
