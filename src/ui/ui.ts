import * as ex from 'excalibur';

import { Timer } from './timer';
import { Engine } from '../train/engine';
import { Player } from '../people/player';

export class UI extends ex.Scene {
  timer = new Timer

  onInitialize(engine: ex.Engine): void {

    const eng = new Engine();
    this.add(eng);

    const player = new Player();
    this.add(player);

    player.addChild(new Timer());
    this.camera.strategy.lockToActor(player);
  }

}

