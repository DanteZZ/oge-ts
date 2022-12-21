import { Canvas, Collider, eColliderType, GameObject } from "../../../../src";
import { sExample } from "../sprites";
// import DVDMovement from "../scripts/dvd_movement";
import movement from "../scripts/movement";
class PlayerObject extends GameObject {
  sprite = sExample?.createInstance();
  name = "player";
  // dvd = new DVDMovement(this);
  public create(): void {
    this.createCollider({
      radius: 30,
      type: eColliderType.circle,
    });
  }
  update() {
    // this.dvd.updateMovement();
    movement(this);
  }
  public draw(canvas?: Canvas): void {
    if (canvas) {
      this.defaultDraw(canvas);
      this.collider?.draw(
        canvas,
        this.isCollide("wall") ? "rgba(255,0,0,.5)" : undefined
      );
    }
  }
}

const Player = new PlayerObject();
export default Player;
