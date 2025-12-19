import * as ex from "excalibur";

export const TimerStart = "timer_start";
export const TimerRestart = "timer_stop";

type TimerFunction = (engine: ex.Engine) => void;

export class Timer extends ex.Label {
  prefix: string;
  time: number;
  callback: TimerFunction;
  isPaused = false;

  timerBackground = new ex.Rectangle({
    width: 140,
    height: 12,
    color: ex.Color.White,
  });

  timerText = new ex.Text({
    text: "foo",
  });

  timerStart: Date;

  constructor(text: string, callback: TimerFunction, time: number) {
    super();
    this.prefix = text;
    this.callback = callback;
    this.time = time;
  }

  onInitialize(engine: ex.Engine): void {
    const textOffsetX = -200;
    const textOffsetY = -200;
    const group = new ex.GraphicsGroup({
      members: [
        {
          graphic: this.timerBackground,
          offset: ex.vec(textOffsetX, textOffsetY),
        },
        { graphic: this.timerText, offset: ex.vec(textOffsetX, textOffsetY) },
      ],
    });
    this.graphics.use(group);
    this.timerStart = new Date(new Date().getTime() + this.time);
    engine.on("pause", () => {
      this.isPaused = true;
    });
    engine.on(TimerStart, () => {
      this.isPaused = false;
      this.timerStart = new Date(new Date().getTime() + this.time);
    });
  }

  onPostUpdate(engine: ex.Engine, elapsed: number): void {
    if (this.isPaused) {
      return;
    }

    const now = new Date();
    const remaining = Math.round(
      (this.timerStart.getTime() - now.getTime()) / 1000,
    );
    if (remaining <= 0) {
      // reset the timer
      this.timerStart = new Date(new Date().getTime() + this.time);

      this.callback(engine);
      /*
      engine.emit("pause");
      engine.emit("timerUp");
      this.isPaused = true;
       */
    }

    this.timerText.text = `${this.prefix} - ${remaining}`;
  }
}
