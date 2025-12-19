import {
  Animation,
  AnimationStrategy,
  Engine,
  SpriteSheet,
  GraphicsGroup,
  vec,
  Rectangle,
  Color,
} from "excalibur";
import { Car, Needs } from "./car";
import { Resources } from "../ui/resources";

export class DiningCar extends Car {
  constructor() {
    super({
      width: 256,
      height: 256,
    });
  }

  onInitialize(engine: Engine): void {
    super.onInitialize(engine);

    const spriteSheet = SpriteSheet.fromImageSource({
      image: Resources.DiningCar,
      grid: {
        rows: 1,
        columns: 1,
        spriteHeight: 256,
        spriteWidth: 256,
      },
    });

    const diningCarAnimation = Animation.fromSpriteSheet(
      spriteSheet,
      [0],
      150,
      AnimationStrategy.Freeze,
    );

    const diningCarBoundingBox = new Rectangle({
      opacity: 0.5,
      height: this.height,
      width: this.width,
      color: Color.Red,
    });

    const group = new GraphicsGroup({
      members: [
        {
          graphic: diningCarAnimation,
          offset: vec(0, 0),
        },
      ],
    });

    this.graphics.use(group);
  }

  fulfill(): Needs {
    return {
      hunger: 10,
      recreation: 0,
    };
  }

  carName(): string {
    return "Dining Car";
  }

  upgrade() {
    super.upgrade();
  }
}
