import * as ex from "excalibur";

import { UI } from "./ui/ui";

const game = new ex.Engine({
  width: 450,
  height: 500,
  backgroundColor: ex.Color.fromHex("#222222"),
  pixelArt: true,
  pixelRatio: 2,
  displayMode: ex.DisplayMode.FitScreen,
  scenes: { Level: UI },
});

game.start().then(() => {
  game.goToScene("Level");
});
