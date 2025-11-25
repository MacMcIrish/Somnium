import { Actor, Engine, Vector } from "excalibur";
import { Passenger } from "../people/passenger";

export class Needs {
  hunger: number;
  recreation: number;
}

export class Car extends Actor {
  passengers: Passenger[];

  constructor(obj) {
    super(obj);
    this.passengers = [];
  }

  attachListener(engine: Engine) {
    this.on("collisionstart", (ev) => {
      if (ev.other.owner instanceof Passenger) {
        this.passengers = this.passengers.concat(ev.other.owner);
      }
    });
    this.on("collisionend", (ev) => {
      if (ev.other.owner instanceof Passenger) {
        this.passengers = this.passengers.filter((p) => p !== ev.other.owner);
      }
    });
  }

  setPos(v: Vector) {
    this.pos = v;
  }

  fulfill(): Needs {
    return {
      hunger: 0,
      recreation: 0,
    };
  }

  isFull(): boolean {
    return false;
  }
}
