import { Boat } from '.';

export class Cruise extends Boat {
  constructor(key: number) {
    super(`Cruise-${key}`, 2);
  }
}
