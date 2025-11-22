import * as ex from "excalibur";

import { Timer } from "./timer";
import { Engine } from "../train/engine";
import { Player } from "../people/player";
import { UpgradePicker } from "./picker";

export class UI extends ex.Scene {
  timer = new Timer();

  onInitialize(engine: ex.Engine): void {
    const eng = new Engine();
    this.add(eng);

    const player = new Player();
    this.add(player);

    player.addChild(new Timer());
    player.addChild(new UpgradePicker());

    this.camera.strategy.lockToActor(player);
  }
}
