import * as ex from "excalibur";

import { Timer } from "./timer";
import { Train } from "../train/train";
import { Player } from "../people/player";
import { UpgradePicker } from "./picker";

export class UI extends ex.Scene {
  timer = new Timer();

  onInitialize(engine: ex.Engine): void {
    const train = new Train();
    this.add(train);

    const player = new Player();
    this.add(player);

    player.addChild(new Timer());

    engine.on("timerUp", () => {
      player.addChild(new UpgradePicker());
    });

    this.camera.strategy.lockToActor(player);
  }
}
