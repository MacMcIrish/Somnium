import * as ex from "excalibur";
import { Resources } from "../ui/resources";
import { Car } from "./car";
import {
  Upgrade,
  UpgradeTypePlayer,
  UpgradeTypeRoom,
  UpgradeTypeTrain,
} from "./upgrade";

export class Engine extends Car {
  playerUpgrade = new Upgrade({
    pos: ex.vec(-55, 100),
    height: 24,
    width: 24,
    upgradeType: UpgradeTypePlayer,
  });
  roomUpgrade = new Upgrade({
    pos: ex.vec(55, 100),
    height: 24,
    width: 24,
    upgradeType: UpgradeTypeRoom,
  });
  trainUpgrade = new Upgrade({
    pos: ex.vec(0, 100),
    height: 24,
    width: 24,
    upgradeType: UpgradeTypeTrain,
  });
  trainUpgradeAnimation: ex.Animation;
  trainUpgradeCount: number = 1;
  trainUpgradeLabel: ex.Text;
  playerUpgradeAnimation: ex.Animation;
  playerUpgradeCount: number = 1;
  playerUpgradeLabel: ex.Text;
  roomUpgradeAnimation: ex.Animation;
  roomUpgradeCount: number = 1;
  roomUpgradeLabel: ex.Text;

  constructor(obj: any) {
    super(obj);
  }

  onInitialize(engine: ex.Engine): void {
    this.attachListener(engine);

    engine.on("pickedUpgrade", (ev) => {
      console.log("picked upgrade", ev);
      switch (ev) {
        case UpgradeTypeTrain:
          this.trainUpgradeCount -= 1;
          break;
        case UpgradeTypeRoom:
          this.roomUpgradeCount -= 1;
          break;
        case UpgradeTypePlayer:
          this.playerUpgradeCount -= 1;
          break;
      }
    });
    engine.on("upgrade", (ev) => {
      if (ev === UpgradeTypeTrain) {
        this.trainUpgradeCount += 1;
      }
      if (ev === UpgradeTypePlayer) {
        this.playerUpgradeCount += 1;
      }
      if (ev === UpgradeTypeRoom) {
        this.roomUpgradeCount += 1;
      }
    });

    const spriteSheet = ex.SpriteSheet.fromImageSource({
      image: Resources.Train,
      grid: {
        rows: 1,
        columns: 1,
        spriteHeight: 256,
        spriteWidth: 256,
      },
    });

    const upgradeSprite = ex.SpriteSheet.fromImageSource({
      image: Resources.Upgrade,
      grid: {
        rows: 1,
        columns: 3,
        spriteHeight: 128,
        spriteWidth: 128,
      },
    });
    this.trainUpgradeAnimation = ex.Animation.fromSpriteSheet(
      upgradeSprite,
      [0],
      150,
      ex.AnimationStrategy.Freeze,
    );
    this.trainUpgradeAnimation.scale = ex.vec(0.25, 0.25);
    this.playerUpgradeAnimation = ex.Animation.fromSpriteSheet(
      upgradeSprite,
      [1],
      150,
      ex.AnimationStrategy.Freeze,
    );
    this.playerUpgradeAnimation.scale = ex.vec(0.25, 0.25);
    this.roomUpgradeAnimation = ex.Animation.fromSpriteSheet(
      upgradeSprite,
      [2],
      150,
      ex.AnimationStrategy.Freeze,
    );
    this.roomUpgradeAnimation.scale = ex.vec(0.25, 0.25);

    const trainAnimation = ex.Animation.fromSpriteSheet(
      spriteSheet,
      [0],
      150,
      ex.AnimationStrategy.Freeze,
    );
    this.playerUpgradeLabel = new ex.Text({
      text: `Count: ${this.playerUpgradeCount}`,
      color: ex.Color.White,
    });
    const trainBoundingBox = new ex.Rectangle({
      lineWidth: 1,
      height: this.height,
      width: this.width,
      opacity: 0.5,
      color: ex.Color.Red,
    });
    trainBoundingBox.origin = this.anchor;

    const graphicsGroup = new ex.GraphicsGroup({
      members: [
        {
          graphic: trainAnimation,
          offset: ex.vec(0, 0),
        },
        {
          graphic: this.playerUpgradeLabel,
          offset: ex.vec(0, 0),
        },
      ],
    });

    this.trainUpgrade.graphics.use(this.trainUpgradeAnimation);
    this.playerUpgrade.graphics.use(this.playerUpgradeAnimation);
    this.roomUpgrade.graphics.use(this.roomUpgradeAnimation);

    this.graphics.use(graphicsGroup);
    this.addChild(this.trainUpgrade);
    this.addChild(this.playerUpgrade);
    this.addChild(this.roomUpgrade);
  }

  onPostUpdate(_engine: ex.Engine, _elapsed: number): void {
    this.playerUpgradeLabel.text = `Count: ${this.playerUpgradeCount}`;
    if (this.trainUpgradeCount >= 1) {
      this.trainUpgrade.graphics.use(this.trainUpgradeAnimation);
    } else {
      this.trainUpgrade.graphics.hide();
    }
    if (this.roomUpgradeCount >= 1) {
      this.roomUpgrade.graphics.use(this.roomUpgradeAnimation);
    } else {
      this.roomUpgrade.graphics.hide();
    }
    if (this.playerUpgradeCount >= 1) {
      this.playerUpgrade.graphics.use(this.playerUpgradeAnimation);
    } else {
      this.playerUpgrade.graphics.hide();
    }
  }
}
