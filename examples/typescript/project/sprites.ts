import app from "../app";
import { aWall, aExample } from "./assets";

export const sWall = app.sprites.create(aWall, "sWall");
export const sExample = app.sprites.create(
  aExample,
  "sExample",
  4,
  0,
  0,
  0,
  0,
  0.5
);
