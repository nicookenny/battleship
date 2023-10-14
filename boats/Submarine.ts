import { Boat } from './';
export class Submarine extends Boat {
  constructor(key: number) {
    super(`Submarine-${key}`, 3);
  }
}
