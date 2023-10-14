import { Boat } from '.';

export class Speedboat extends Boat {
  constructor(key: number) {
    super(`Speedboat-${key}`, 1);
  }
}
