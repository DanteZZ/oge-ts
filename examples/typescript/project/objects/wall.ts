import { GameObject } from "../../../../src";
import { sWall } from "../sprites";

class Wall extends GameObject {
  width = 128;
  height = 128;
  sprite = sWall.createInstance();
}

export default Wall;
