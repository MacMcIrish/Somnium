import * as ex from "excalibur";

import { Timer } from "./timer";
import { Train } from "../train/train";
import { Player } from "../people/player";
import { UpgradePicker } from "./picker";
import { Log } from "./log";

export class UI extends ex.Scene {
  onInitialize(engine: ex.Engine): void {
    const train = new Train();
    this.add(train);

    const player = new Player();
    this.add(player);

    const upgradeTimer = new Timer(
      "Time to upgrade",
      (engine) => {
        engine.emit("upgrade");
        engine.emit("pause");
      },
      60000,
    );
    upgradeTimer.pos = ex.vec(0, 10);
    player.addChild(upgradeTimer);
    player.addChild(
      new Timer(
        "Time to children",
        (engine) => {
          engine.emit("addChildren");
        },
        30000,
      ),
    );
    player.addChild(new Log());

    engine.on("timerUp", () => {
      player.addChild(new UpgradePicker());
    });

    this.camera.strategy.lockToActor(player);
  }
}
