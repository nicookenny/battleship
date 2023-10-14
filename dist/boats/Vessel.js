"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vessel = void 0;
const _1 = require(".");
class Vessel extends _1.Boat {
    constructor(key) {
        super(`Vessel-${key}`, 4);
    }
}
exports.Vessel = Vessel;
