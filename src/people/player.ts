import * as ex from "excalibur";

export class Player extends ex.Actor {
  speed: number;

  constructor() {
    super({
      width: 10,
      height: 10,
      color: ex.Color.Blue,
      z: 1,
    });
  }

  onInitialize(engine: ex.Engine): void {
    this.speed = 2.5;
    engine.on("playerUpgrade", (ev) => {
      if (ev === "speed") {
        this.speed += 1;
      }
    });
  }

  override onPostUpdate(engine: ex.Engine): void {
    if (engine.input.keyboard.isHeld(ex.Keys.A)) {
      this.pos.x -= this.speed;
    }
    if (engine.input.keyboard.isHeld(ex.Keys.D)) {
      this.pos.x += this.speed;
    }
    if (engine.input.keyboard.isHeld(ex.Keys.W)) {
      this.pos.y -= this.speed;
    }
    if (engine.input.keyboard.isHeld(ex.Keys.S)) {
      this.pos.y += this.speed;
    }
  }
}
