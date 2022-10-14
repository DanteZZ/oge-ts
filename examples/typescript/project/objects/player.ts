import { GameObject } from "../../../../src/modules/gameObject";
import { sExample } from "../sprites";

enum dirs {
  RIGHT,
  LEFT,
  TOP,
  DOWN,
}

class PlayerObject extends GameObject {
  sprite = sExample?.createInstance();
  directionH: dirs = dirs.RIGHT;
  directionV: dirs = dirs.DOWN;
  speed: number = 5;

  update() {
    if (this.x <= 0) {
      this.directionH = dirs.RIGHT;
    }
    if (this.x >= 800 - 128) {
      this.directionH = dirs.LEFT;
    }
    if (this.y <= 0) {
      this.directionV = dirs.DOWN;
    }
    if (this.y >= 600 - 128) {
      this.directionV = dirs.TOP;
    }
    this.x += this.directionH === dirs.RIGHT ? this.speed : -this.speed;
    this.y += this.directionV === dirs.DOWN ? this.speed : -this.speed;
  }

  draw() {
    this.sprite.draw(
      this.getBuffer().getCanvas(),
      this.x,
      this.y,
      0,
      0,
      this.x
    );
  }
}

const Player = new PlayerObject();
export default Player;
