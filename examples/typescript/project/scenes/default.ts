import { Camera } from "../../../../src";
import { Scene } from "../../../../src";
import { Canvas } from "../../../../src";
import app from "../../app";
import { aWall } from "../assets";
import Player from "../objects/player";
import Wall from "../objects/wall";

class _DefaultScene extends Scene {
  public width: number = 2000;
  public height: number = 600;
  private mainCamera?: Camera;

  public init(): void {
    app.instanceBuffer.addInstances([
      Player,
      new Wall({
        x: 100,
        y: 100,
        depth: -1,
      }),
    ]);

    this.mainCamera = new Camera(this);
    this.mainCamera.setTrackInstance(Player);
    this.setCamera(this.mainCamera);
  }

  public draw(canvas: Canvas): void {
    canvas.ctx.fillStyle = "#c2c2c2";
    canvas.ctx.fillRect(0 - canvas.offsetX, 0 - canvas.offsetY, 2000, 600);
    canvas.ctx.strokeRect(0 - canvas.offsetX, 0 - canvas.offsetY, 2000, 600);
    canvas.drawAsset({
      asset: aWall,
      x: 0,
      y: 0,
    });
  }
}

const DefaultScene = new _DefaultScene();
export default DefaultScene;
