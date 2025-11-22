import * as ex from 'excalibur';

import { Engine } from './train/engine';
import { Timer } from './ui/timer'
import { Player} from './people/player';

const game = new ex.Engine({
    width: 450,
    height: 500,
    backgroundColor: ex.Color.fromHex('#222222'),
    pixelArt: true,
    pixelRatio: 2,
    displayMode: ex.DisplayMode.FitScreen,
});

const engine = new Engine();
game.add(engine);

const player = new Player();
game.add(player);

const timer = new Timer();
game.add(timer);

game.start();
