import * as ex from "excalibur";
import { TimerStart } from "./timer";

export class UpgradePicker extends ex.Actor {
  constructor() {
    super({
      pos: ex.vec(0, 0),
      width: 200,
      height: 200,
      color: ex.Color.Green,
    });
  }

  upgrade(engine: ex.Engine) {
    engine.emit("unpause");
    this.kill();
  }

  onInitialize(engine: ex.Engine): void {
    const trainUpgrade = new ex.Actor({
      width: 100,
      height: 200,
      color: ex.Color.Blue,
      pos: ex.vec(-100, 0),
    });
    this.addChild(trainUpgrade);
    trainUpgrade.on("pointerup", () => {
      this.upgrade(engine);
    });
    const roomUpgrade = new ex.Actor({
      width: 100,
      height: 200,
      color: ex.Color.Yellow,
      pos: ex.vec(0, 0),
    });

    this.addChild(roomUpgrade);
    roomUpgrade.on("pointerup", () => {
      this.upgrade(engine);
    });

    const playerUpgrade = new ex.Actor({
      width: 100,
      height: 200,
      color: ex.Color.Red,
      pos: ex.vec(100, 0),
    });
    this.addChild(playerUpgrade);
    playerUpgrade.on("pointerup", () => {
      engine.emit(TimerStart);
      engine.emit("playerUpgrade", "speed");
      this.upgrade(engine);
    });
  }
}
