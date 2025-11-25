import { Color, Engine, Rectangle, vec } from "excalibur";
import { Car, Needs } from "./car";

export class DiningCar extends Car {
  tables: number;

  constructor() {
    super({
      height: 140,
      width: 80,
      color: Color.Yellow,
      pos: vec(0, 150),
    });
  }

  onInitialize(engine: Engine): void {
    this.attachListener(engine);
  }

  fulfill(): Needs {
    return {
      hunger: 10,
      recreation: 0,
    };
  }
}
