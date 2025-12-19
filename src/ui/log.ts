import {
  Text,
  Engine,
  GraphicsGroup,
  Label,
  Rectangle,
  vec,
  Color,
} from "excalibur";

import { spriteFont } from "./font";

export const LogMessageEvent = "logMessage";

export class Log extends Label {
  logs: String[];
  textArea: Text;
  onInitialize(engine: Engine): void {
    engine.on(LogMessageEvent, (ev) => {
      if (typeof ev === "string") {
        console.log("got updating...", ev);
        this.logs.unshift(ev);
        this.logs = this.logs.slice(0, 10);
        this.textArea.text = this.logs.join("\n");
      }
    });
    this.logs = ["one", "two", "three"];

    const background = new Rectangle({
      height: 200,
      width: engine.canvasWidth / 6,
      color: Color.White,
    });
    this.textArea = new Text({
      text: this.logs.join("\n"),
      height: 20,
      width: 20,
      color: Color.Black,
    });
    const group = new GraphicsGroup({
      members: [
        {
          graphic: background,
          offset: vec(engine.canvasWidth / 12, 0),
        },
        {
          graphic: this.textArea,
          offset: vec(engine.canvasWidth / 12, 0),
        },
      ],
    });
    this.graphics.use(group);
  }
}
