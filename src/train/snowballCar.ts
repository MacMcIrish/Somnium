import { Color, Engine } from "excalibur";
import { Car, Needs } from "./car";

export class SnowballCar extends Car {
  constructor() {
    super({
      height: 140,
      width: 80,
      color: Color.White,
    });
  }

  onInitialize(engine: Engine): void {
    this.attachListener(engine);
  }

  fulfill(): Needs {
    return {
      hunger: 0,
      recreation: 30,
    };
  }
}
