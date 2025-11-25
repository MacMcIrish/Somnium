import * as ex from "excalibur";
import { Car } from "./car";

export class Engine extends Car {
  constructor() {
    super({
      //pos: ex.vec(250, 200),
      width: 80,
      height: 140,
      color: ex.Color.Purple,
    });
  }

  onInitialize(engine: ex.Engine): void {
    this.attachListener(engine);
  }
}
