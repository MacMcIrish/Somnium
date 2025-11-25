import {
  Actor,
  Color,
  GraphicsGroup,
  Engine,
  Vector,
  vec,
  Rectangle,
  Text,
} from "excalibur";
import { names } from "./names";
import { Train } from "../train/train";
import { Car, Needs } from "../train/car";

const moveSpeed = 100;

export class Passenger extends Actor {
  name: string;
  train: Train;
  happiness: number;
  happinessLabel: Rectangle;
  recreation: number;
  recreationLabel: Rectangle;
  hunger: number;
  hungerLabel: Rectangle;
  hungerRate: number;
  recreationRate: number;
  isPaused: boolean;

  isMoving: boolean;
  moveDestination: Vector;
  destinationCar: Car;

  state: string;
  carHistory: Car[];
  currentCar: Car;

  gameTickFn: () => void;

  secondsInCurrentArea: number;
  // characters will stick to an area for a minimum amount of time before moving to their next "need"
  timeInCurrentArea: number;

  constructor(pos: Vector, train: Train) {
    super({
      pos: pos,
      height: 10,
      width: 10,
      color: Color.White,
      z: 1,
    });
    this.train = train;
    this.hungerRate = 3;
    this.recreationRate = 5;
  }

  giveDirections(point: Vector) {
    // lerp your way to the given location
    this.actions.moveTo(point, moveSpeed);
    this.moveDestination = point;
    this.state = "moving";
  }

  fulfill(n: Needs) {
    this.hunger = Math.min(this.hunger + n.hunger, 100);
    this.recreation = Math.min(this.recreation + n.recreation, 100);
  }

  onPostUpdate(engine: Engine, elapsed: number): void {
    if (this.isPaused) {
      return;
    }

    this.timeInCurrentArea += elapsed / 1000;
    const secondsInCurrentArea = Math.floor(this.timeInCurrentArea);
    const gameTick = secondsInCurrentArea !== this.secondsInCurrentArea;
    if (gameTick) {
      this.secondsInCurrentArea = secondsInCurrentArea;
      this.recreation = Math.max(this.recreation - this.recreationRate, 0);
      this.hunger = Math.max(this.hunger - this.hungerRate, 0);
      this.happiness = (this.recreation + this.hunger) / 2;

      this.hungerLabel.width = (this.hunger / 100) * 20;
      this.recreationLabel.width = (this.recreation / 100) * 20;
      this.happinessLabel.width = (this.happiness / 100) * 20;
    }

    if (this.happiness <= 0) {
      console.log("this shit sucks im out");
      this.kill();
      return;
    }

    switch (this.state) {
      case "moving":
        if (this.pos.equals(this.moveDestination, 40)) {
          this.state = "arrived";
        }
        break;
      case "arrived":
        // I'm using that caching above to not move around too much
        if (
          this.currentCar === undefined ||
          this.currentCar !== this.destinationCar
        ) {
          return;
        }

        // meander
        if (gameTick && this.secondsInCurrentArea % 3 === 0) {
          this.actions.moveTo(
            vec(
              this.moveDestination.x + Math.random() * 40 - 20,
              this.moveDestination.y + Math.random() * 40 - 20,
            ),
            100,
          );
        }

        const f = this.currentCar.fulfill();
        if (gameTick) {
          this.currentCar.isFull();
          this.fulfill(f);
        }

        // need to be sure not to leave a place where the passenger needs are being fulfilled
        if (f.hunger === 0 && this.hunger < 50 && this.recreation > 70) {
          this.state = "findingHunger";
        } else if (f.hunger === 0 && this.hunger < 10) {
          this.state = "findingHunger";
        } else if (
          f.recreation === 0 &&
          this.recreation < 50 &&
          this.hunger > 90
        ) {
          this.state = "findingRecreation";
        }

        break;
      case "findingHunger":
        console.log("i need hunger");
        const hungerCars = this.train.cars
          .filter((c) => c.fulfill().hunger > 0)
          .map((c) => ({ car: c, penalty: this.pos.distance(c.pos) }))
          .sort((a, b) => a.penalty - b.penalty);
        if (hungerCars.length === 0) {
          return;
        }
        this.moveDestination = hungerCars[0].car.pos;
        this.destinationCar = hungerCars[0].car;
        this.actions.moveTo(this.moveDestination, moveSpeed);
        this.state = "moving";

        break;
      case "findingRecreation":
        console.log("i need rec");
        const recreationCars = this.train.cars
          .filter((c) => c.fulfill().recreation > 0)
          .map((c) => ({ car: c, penalty: this.pos.distance(c.pos) }))
          .sort((a, b) => a.penalty - b.penalty);
        if (recreationCars.length === 0) {
          return;
        }
        this.moveDestination = recreationCars[0].car.pos;
        this.destinationCar = recreationCars[0].car;
        this.actions.moveTo(this.moveDestination, moveSpeed);
        console.log("setting state to moving");
        this.state = "moving";
        break;
    }
  }

  onInitialize(engine: Engine): void {
    this.happiness = 100;
    this.recreation = 100;
    this.hunger = 100;
    this.timeInCurrentArea = 0;
    this.carHistory = [];
    this.name = names[Math.floor(Math.random() * names.length)];
    this.state = "findingRecreation";
    engine.on("pause", () => {
      this.isPaused = true;
    });
    engine.on("resume", () => {
      this.isPaused = false;
    });
    this.on("collisionstart", (ev) => {
      if (ev.other.owner instanceof Car) {
        this.currentCar = ev.other.owner;
        this.timeInCurrentArea = 0;

        if (this.currentCar === this.destinationCar) {
          this.carHistory = this.carHistory.filter(
            (c) => c !== this.currentCar,
          );
          this.carHistory.unshift(this.currentCar);
        }
      }
    });
    this.on("collisionend", (ev) => {
      if (ev.other.owner instanceof Car && this.currentCar === ev.other.owner) {
        this.currentCar = undefined;
        this.timeInCurrentArea = 0;
      }
    });

    this.hungerLabel = new Rectangle({
      width: 20,
      height: 3,
      color: Color.Orange,
      strokeColor: Color.Black,
      lineWidth: 1,
    });
    this.recreationLabel = new Rectangle({
      width: 20,
      height: 3,
      color: Color.Green,
      strokeColor: Color.Black,
      lineWidth: 1,
    });
    this.happinessLabel = new Rectangle({
      width: 20,
      height: 3,
      color: Color.Yellow,
      strokeColor: Color.Black,
      lineWidth: 1,
    });

    engine.on("gameTick", this.gameTickFn);

    const passengerRectangle = new Rectangle({
      width: 10,
      height: 10,
      color: Color.Brown,
    });
    const passengerLabel = new Text({
      text: this.name,
      color: Color.White,
    });

    const group = new GraphicsGroup({
      members: [
        {
          graphic: passengerRectangle,
          offset: vec(0, 0),
        },
        {
          graphic: passengerLabel,
          offset: vec(0, 10),
        },
        {
          graphic: this.hungerLabel,
          offset: vec(-10, -20),
        },
        {
          graphic: this.recreationLabel,
          offset: vec(-10, -15),
        },
        {
          graphic: this.happinessLabel,
          offset: vec(-10, -10),
        },
      ],
    });
    this.graphics.use(group);
    // on timer pause, character should pause too
  }
}
