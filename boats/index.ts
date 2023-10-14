export class Boat {
  constructor(private readonly name: string, private readonly length: number) {
    this.name = name;
    this.length = length;
  }

  get Name(): string {
    return this.name;
  }

  get Length(): number {
    return this.length;
  }
}
