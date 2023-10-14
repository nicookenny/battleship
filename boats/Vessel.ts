import { Boat } from '.';

export class Vessel extends Boat {
  constructor(key: number) {
    super(`Vessel-${key}`, 4);
  }
}
