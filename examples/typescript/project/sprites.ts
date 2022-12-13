import app from "../app";
import { aWall, aExample } from "./assets";

export const sWall = app.sprites.create(aWall, "sWall");
export const sExample = app.sprites.create(aExample, "sExample", {
  centerX: 64,
  centerY: 64,
  frames: 4,
  speed: 0.5,
});
