import { Resources } from "./resources";
import { SpriteFont, SpriteSheet, vec } from "excalibur";
const spriteFontSheet = SpriteSheet.fromImageSource({
  image: Resources.Font,
  grid: {
    rows: 3,
    columns: 16,
    spriteWidth: 16,
    spriteHeight: 16,
  },
});

export const spriteFont = new SpriteFont({
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz,!'&.\"?-()+ ",
  caseInsensitive: true,
  spriteSheet: spriteFontSheet,
  scale: vec(0.5, 0.5),
});
