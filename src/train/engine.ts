import * as ex from "excalibur";

export class Engine extends ex.Actor {
  constructor() {
    super({
      pos: ex.vec(250, 200),
      width: 80,
      height: 140,
      color: ex.Color.Purple,
    });
  }
}
