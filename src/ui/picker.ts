import * as ex from "excalibur";

export class UpgradePicker extends ex.Actor {
  constructor() {
    super({
      pos: ex.vec(0, 0),
      width: 200,
      height: 200,
      color: ex.Color.Green,
    });
  }

  onInitialize(engine: ex.Engine): void {
    // show the upgrade types?

    const trainUpgrade = new ex.Actor({
      width: 100,
      height: 200,
      color: ex.Color.Blue,
      pos: ex.vec(-100, 0),
    });
    this.addChild(trainUpgrade);
    trainUpgrade.on("pointerup", () => {
      console.log("train upgrade");
    });
    const roomUpgrade = new ex.Actor({
      width: 100,
      height: 200,
      color: ex.Color.Yellow,
      pos: ex.vec(0, 0),
    });

    this.addChild(roomUpgrade);
    roomUpgrade.on("pointerup", () => {
      console.log("room upgrade");
    });

    const playerUpgrade = new ex.Actor({
      width: 100,
      height: 200,
      color: ex.Color.Red,
      pos: ex.vec(100, 0),
    });
    this.addChild(playerUpgrade);
    playerUpgrade.on("pointerup", () => {
      console.log("player upgrade");
    });
  }
}
