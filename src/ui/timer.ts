import * as ex from 'excalibur';

export class Timer extends ex.Label {
  timerBackground = new ex.Rectangle({
    width: 140,
    height: 10,
    color: ex.Color.White,
  });

  timerText = new ex.Text({
    text: 'foo',
  })

  timerStart : Date;

  constructor() {
    super({
      pos: ex.vec(0, 0),
      x: 10,
      y: 0,
      z: 1,

      color: ex.Color.Black,
    })
  }

  onInitialize(engine: ex.Engine): void {
    const textOffsetX = -200;
    const textOffsetY = -200;
    const group = new ex.GraphicsGroup({
      members: [
        { graphic: this.timerBackground, offset: ex.vec(textOffsetX, textOffsetY) },
        { graphic: this.timerText, offset: ex.vec(textOffsetX, textOffsetY)},
      ]
    })
    this.graphics.use(group);
    this.timerStart = new Date(new Date().getTime() + 60000);
  }

  onPostUpdate(engine: ex.Engine, elapsed: number): void {
    const now = new Date();
    const remaining = Math.round((this.timerStart.getTime() - now.getTime()) / 1000);
    if (remaining <= 0) {
      this.timerStart = new Date(new Date().getTime() + 60000);
    }

    this.timerText.text = `${remaining}`;
  }
}
