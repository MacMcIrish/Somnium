import * as ex from "excalibur";

export const TimerStart = "timer_start";
export const TimerRestart = "timer_stop";

export class Timer extends ex.Label {
  time = 10000;
  isPaused = true;

  timerBackground = new ex.Rectangle({
    width: 140,
    height: 10,
    color: ex.Color.White,
  });

  timerText = new ex.Text({
    text: "foo",
  });

  timerStart: Date;

  constructor() {
    super({
      pos: ex.vec(0, 0),
      x: 10,
      y: 0,
      z: 1,

      color: ex.Color.Black,
    });
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
      this.timerStart = new Date(new Date().getTime() + this.time);
      engine.emit("pause");
      engine.emit("timerUp");
      this.isPaused = true;
    }

    this.timerText.text = `${remaining}`;
  }
}
