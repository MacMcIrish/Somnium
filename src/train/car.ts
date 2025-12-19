import { Actor, ActorArgs, Color, Engine, Label, Vector, vec } from "excalibur";
import { Passenger } from "../people/passenger";

export class Needs {
  hunger: number;
  recreation: number;
}

export class Car extends Actor {
  passengers: Passenger[];
  usedSpots: number;
  spots: number;

  spotsLabel: Label;
  usedSpotsLabel: Label;

  constructor(obj?: ActorArgs) {
    super(obj);
    this.passengers = [];
    this.usedSpots = 0;
    this.spots = 6;

    this.spotsLabel = new Label({
      color: Color.White,
      pos: vec(100, -90),
    });
    this.usedSpotsLabel = new Label({
      color: Color.White,
      pos: vec(100, -80),
    });
  }

  upgrade() {
    this.spots += 1;
  }

  onInitialize(engine: Engine) {
    this.attachListener(engine);

    this.addChild(this.spotsLabel);
    this.addChild(this.usedSpotsLabel);
  }

  attachListener(_engine: Engine) {
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

  carName(): string {
    return "some car?";
  }

  reserve(): boolean {
    if (this.isFull()) {
      return false;
    }

    this.usedSpots += 1;
    return true;
  }

  isFull(): boolean {
    return this.usedSpots >= this.spots;
  }

  onPostUpdate(engine: Engine, elapsed: number): void {
    super.onPostUpdate(engine, elapsed);

    this.spotsLabel.text = `Spots: ${this.spots}`;
    this.usedSpotsLabel.text = `Used spots: ${this.usedSpots}`;
  }
}
