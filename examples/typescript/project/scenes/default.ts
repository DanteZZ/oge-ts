import { Camera, Scene, Canvas, AssetPattern } from "../../../../src";
import { aWall } from "../assets";
import Player from "../objects/player";
import Wall from "../objects/wall";

class _DefaultScene extends Scene {
  public width: number = 2000;
  public height: number = 600;
  private mainCamera?: Camera;
  private background?: AssetPattern;
  public init(): void {
    this.instances.addInstances([
      Player,
      // new Wall({
      //   x: 100,
      //   y: 100,
      //   depth: -1,
      // }),
    ]);

    this.mainCamera = new Camera(this);
    this.mainCamera.setTrackInstance(Player);
    this.background = new AssetPattern(this.getCanvas(), aWall);
    this.setCamera(this.mainCamera);
  }

  public draw(canvas: Canvas): void {
    canvas.drawRect(600, 0, 600, 600, {
      fillStyle: this.background,
      stroked: true,
    });
    canvas.drawText("Hello World", 100, 100, {
      font: "24px serif",
      strokeStyle: this.background,
      fixed: true,
      strokeOnly: true,
    });
    // canvas.drawAsset({
    //   asset: aWall,
    //   x: 0,
    //   y: 0,
    // });
  }
}

const DefaultScene = new _DefaultScene();
export default DefaultScene;
