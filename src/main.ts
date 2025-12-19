import * as ex from "excalibur";

import { UI } from "./ui/ui";
import { Resources } from "./ui/resources";
const game = new ex.Engine({
  width: 800,
  height: 500,
  backgroundColor: ex.Color.fromHex("#222222"),
  pixelArt: true,
  pixelRatio: 2,
  displayMode: ex.DisplayMode.FitScreen,
  scenes: { Level: UI },
});

const loader = new ex.Loader(Object.values(Resources));

game.start(loader).then(() => {
  game.goToScene("Level");
});
