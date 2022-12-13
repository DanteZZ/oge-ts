import { Canvas, GameObject } from "../../../../src";
import { sWall } from "../sprites";

class Wall extends GameObject {
  name = "wall";
  width = 128;
  height = 128;
  sprite = sWall.createInstance();
  public create(): void {
    this.createCollider({ width: 128, height: 128 });
  }
  public draw(canvas?: Canvas): void {
    this.defaultDraw(canvas);
    this.collider?.draw(
      canvas,
      this.isCollide("player") ? "rgba(255,0,0,.5)" : undefined
    );
  }
}

export default Wall;
