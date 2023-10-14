import { Boat } from '.';

export class AircraftCarrier extends Boat {
  constructor(key: number) {
    super(`AircraftCarrier-${key}`, 5);
  }
}
