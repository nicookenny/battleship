"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AircraftCarrier = void 0;
const _1 = require(".");
class AircraftCarrier extends _1.Boat {
    constructor(key) {
        super(`AircraftCarrier-${key}`, 5);
    }
}
exports.AircraftCarrier = AircraftCarrier;
