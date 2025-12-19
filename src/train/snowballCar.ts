import {
  Animation,
  AnimationStrategy,
  Color,
  Engine,
  SpriteSheet,
  GraphicsGroup,
  Rectangle,
  vec,
  Text,
  Label,
} from "excalibur";
import { Resources } from "../ui/resources";
import { Car, Needs } from "./car";

export class SnowballCar extends Car {
  constructor(obj: any) {
    super({
      width: 256,
      height: 256,
    });
    this.spots = 2;
  }

  onInitialize(engine: Engine): void {
    super.onInitialize(engine);

    const spriteSheet = SpriteSheet.fromImageSource({
      image: Resources.SnowballCar,
      grid: {
        rows: 1,
        columns: 1,
        spriteHeight: 256,
        spriteWidth: 256,
      },
    });

    const snowballCarAnimation = Animation.fromSpriteSheet(
      spriteSheet,
      [0],
      150,
      AnimationStrategy.Freeze,
    );

    const snowballCarBoundingBox = new Rectangle({
      opacity: 0.5,
      height: this.height,
      width: this.width,
      color: Color.Red,
    });

    const group = new GraphicsGroup({
      members: [
        {
          graphic: snowballCarAnimation,
          offset: vec(0, 0),
        },
      ],
    });

    this.graphics.use(group);
  }

  fulfill(): Needs {
    return {
      hunger: 0,
      recreation: 30,
    };
  }

  carName(): string {
    return "Snowball Car";
  }
}
