import * as ex from 'excalibur';

export class Timer extends ex.Actor {
  constructor() {
    super({
      pos: ex.vec(0, 0),
      width: 900,
      height: 60,
      color: ex.Color.White,
    })
  }
}
