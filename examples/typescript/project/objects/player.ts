import { GameObject } from "../../../../src/modules/gameObject";
import { sExample } from "../sprites";
// import DVDMovement from "../scripts/dvd_movement";
import movement from "../scripts/movement";
class PlayerObject extends GameObject {
  sprite = sExample?.createInstance();
  // dvd = new DVDMovement(this);
  constructor() {
    super();
  }
  update() {
    // this.dvd.updateMovement();
    movement(this);
  }
}

const Player = new PlayerObject();
export default Player;
