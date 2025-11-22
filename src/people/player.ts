import * as ex from "excalibur";

export class Player extends ex.Actor {
  constructor() {
    super({
      pos: ex.vec(250, 200),
      width: 10,
      height: 10,
      color: ex.Color.Blue,
    });
  }

  override onPostUpdate(engine: ex.Engine): void {
    if (engine.input.keyboard.isHeld(ex.Keys.A)) {
      this.pos.x -= 0.5;
    }
    if (engine.input.keyboard.isHeld(ex.Keys.D)) {
      this.pos.x += 0.5;
    }
    if (engine.input.keyboard.isHeld(ex.Keys.W)) {
      this.pos.y -= 0.5;
    }
    if (engine.input.keyboard.isHeld(ex.Keys.S)) {
      this.pos.y += 0.5;
    }
  }
}
