import * as ex from "excalibur";
import { Car } from "./car";
import { DiningCar } from "./diningCar";
import { Engine } from "./engine";
import { SnowballCar } from "./snowballCar";
import { Passenger } from "../people/passenger";

export class Train extends ex.Actor {
  cars: Car[];

  constructor() {
    super({});
  }

  onInitialize(engine: ex.Engine): void {
    engine.on("upgradeTrain", () => {
      const cars = [new DiningCar(), new SnowballCar({})];
      this.addCar(cars[Math.floor(Math.random() * cars.length)]);
    });
    engine.on("addChildren", () => {
      for (let i = 0; i < Math.random() * 5; i++) {
        const passenger = new Passenger(ex.vec(0, -30), this);
        this.addChild(passenger);
      }
    });
    const eng = new Engine({
      height: 256,
      width: 256,
    });
    this.cars = [eng];
    this.addChild(eng);

    this.addCar(new DiningCar());
    this.addCar(new SnowballCar({}));

    // const addCarButton = new ex.Actor({
    //   pos: ex.vec(-100, -100),
    //   color: ex.Color.White,
    //   height: 10,
    //   width: 10,
    //   z: 1,
    // });
    // addCarButton.on("pointerup", () => {
    //   if (this.cars.length % 3 === 1) {
    //     this.addCar(new DiningCar());
    //   } else if (this.cars.length % 3 === 2) {
    //     this.addCar(new SnowballCar({}));
    //   }
    // });
    //this.addChild(addCarButton);

    // const addPassengerButton = new ex.Actor({
    //   pos: ex.vec(0, 0),
    //   color: ex.Color.Blue,
    //   height: 10,
    //   width: 10,
    //   z: 1,
    // });
    // addPassengerButton.on("pointerup", () => {
    //   const passenger = new Passenger(ex.vec(0, -30), this);
    //   this.addChild(passenger);
    // });
    // this.addChild(addPassengerButton);
  }

  addCar(c: Car): void {
    this.addChild(c);
    const lastCar = this.cars[this.cars.length - 1];
    console.log("extending last car...");
    c.setPos(ex.vec(lastCar.pos.x, lastCar.pos.y + 256));
    this.cars = this.cars.concat(c);
    console.log(this.cars);
  }
}
