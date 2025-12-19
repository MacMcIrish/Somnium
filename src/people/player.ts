import * as ex from "excalibur";
import { Resources } from "../ui/resources";
import { Car } from "../train/car";
import { Engine } from "../train/engine";
import {
  Upgrade,
  UpgradeTypePlayer,
  UpgradeTypeRoom,
  UpgradeTypeTrain,
} from "../train/upgrade";

export class Player extends ex.Actor {
  speed: number;
  isHoldingUpgrade: boolean = false;
  heldUpgrade: string;
  currentCar?: Car;
  upgrade?: Upgrade = null;

  constructor() {
    super({
      z: 1,
      height: 1,
      width: 1,
    });
  }

  placeUpgrade(engine: ex.Engine): void {
    if (!this.isHoldingUpgrade) {
      return;
    }
    console.log("upgrading!", this.heldUpgrade);

    if (this.heldUpgrade === "player") {
      this.speed += 1;
    } else if (this.heldUpgrade === "train") {
      engine.emit("upgradeTrain");
    } else {
      if (!this.currentCar) {
        return;
      }
      this.currentCar.upgrade();
    }

    console.log("removing upgrade");
    this.isHoldingUpgrade = false;
    this.graphics.use("down");
  }

  onInitialize(engine: ex.Engine): void {
    this.speed = 2.5;
    engine.on("playerUpgrade", (ev) => {
      if (ev === "speed") {
        this.speed += 1;
      }
    });
    this.on("collisionstart", (ev) => {
      console.log("player collision");
      if (ev.other.owner instanceof Upgrade) {
        this.upgrade = ev.other.owner;
        console.log("setting upgrade", this.upgrade.upgradeType);
      }
      if (ev.other.owner instanceof Car) {
        console.log("player collision with car", ev.other.owner.carName());
        this.currentCar = ev.other.owner;
      }
    });
    this.on("collisionend", (ev) => {
      if (ev.other.owner instanceof Upgrade) {
        console.log("removing upgrade");
        this.upgrade = null;
      }
    });

    const spriteSheet = ex.SpriteSheet.fromImageSource({
      image: Resources.Elf4,
      grid: {
        rows: 2,
        columns: 2,
        spriteWidth: 128,
        spriteHeight: 128,
      },
    });

    const playerDownAnimation = ex.Animation.fromSpriteSheet(
      spriteSheet,
      [0],
      150,
      ex.AnimationStrategy.Freeze,
    );
    playerDownAnimation.scale = ex.vec(0.25, 0.25);

    const playerUpAnimation = ex.Animation.fromSpriteSheet(
      spriteSheet,
      [1],
      150,
      ex.AnimationStrategy.Freeze,
    );
    playerUpAnimation.scale = ex.vec(0.25, 0.25);
    const playerBoxAnimation = ex.Animation.fromSpriteSheet(
      spriteSheet,
      [2],
      150,
      ex.AnimationStrategy.Freeze,
    );
    playerBoxAnimation.scale = ex.vec(0.25, 0.25);
    this.graphics.add("down", playerDownAnimation);
    this.graphics.use("down");
    this.graphics.add("up", playerUpAnimation);
    this.graphics.add("box", playerBoxAnimation);
  }

  grabUpgrade(engine: ex.Engine): void {
    if (this.upgrade === null) {
      console.log("not standing on an upgrade");
      return;
    }
    if (!(this.currentCar instanceof Engine)) {
      console.log("not in the engine room");
      return;
    }

    if (
      this.upgrade.upgradeType === UpgradeTypeTrain &&
      this.currentCar.trainUpgradeCount <= 0
    ) {
      console.log("no more train");
      return;
    }
    if (
      this.upgrade.upgradeType === UpgradeTypePlayer &&
      this.currentCar.playerUpgradeCount <= 0
    ) {
      return;
    }
    if (
      this.upgrade.upgradeType === UpgradeTypeRoom &&
      this.currentCar.roomUpgradeCount <= 0
    ) {
      return;
    }
    this.isHoldingUpgrade = true;
    this.heldUpgrade = this.upgrade.upgradeType;
    engine.emit("pickedUpgrade", this.upgrade.upgradeType);
  }

  override onPostUpdate(engine: ex.Engine): void {
    if (this.isHoldingUpgrade) {
      this.graphics.use("box");
    }

    if (engine.input.keyboard.wasReleased(ex.Keys.Space)) {
      this.placeUpgrade(engine);
    }

    // grab upgrade
    if (
      engine.input.keyboard.wasReleased(ex.Keys.Space) &&
      !this.isHoldingUpgrade
    ) {
      this.grabUpgrade(engine);
    }

    if (engine.input.keyboard.isHeld(ex.Keys.A)) {
      this.pos.x = Math.max(-85, this.pos.x - this.speed);
      if (!this.isHoldingUpgrade) {
        this.graphics.use("up");
      }
    }
    if (engine.input.keyboard.isHeld(ex.Keys.D)) {
      this.pos.x = Math.min(85, this.pos.x + this.speed);
      if (!this.isHoldingUpgrade) {
        this.graphics.use("down");
      }
    }
    if (engine.input.keyboard.isHeld(ex.Keys.W)) {
      this.pos.y = Math.max(75, this.pos.y - this.speed);
      if (!this.isHoldingUpgrade) {
        this.graphics.use("up");
      }
    }
    if (engine.input.keyboard.isHeld(ex.Keys.S)) {
      // TODO calculate new height
      this.pos.y = Math.min(1000, this.pos.y + this.speed);
      if (!this.isHoldingUpgrade) {
        this.graphics.use("down");
      }
    }
  }
}
