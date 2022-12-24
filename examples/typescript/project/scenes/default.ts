import { Camera, Scene, Canvas, AssetPattern } from "../../../../src";
import { aWall } from "../assets";
import Player from "../objects/player";
import Wall from "../objects/wall";

class _DefaultScene extends Scene {
  public width: number = 2000;
  public height: number = 800;
  private mainCamera?: Camera;
  private background?: AssetPattern;
  private guiLayer?: Canvas;
  public init(): void {
    this.instances.addInstances([
      Player,
      new Wall({
        x: 100,
        y: 100,
        depth: -1,
      }),
    ]);

    this.mainCamera = new Camera(this);
    this.mainCamera.setTrackInstance(Player);
    this.background = new AssetPattern(this.getCanvas(), aWall);
    this.setCamera(this.mainCamera);
    this.getCanvas().scale = 2;
    this.guiLayer = this.createCanvas("gui");
  }

  public draw(canvas: Canvas): void {
    canvas.drawRect(600, 100, 600, 600, {
      fillStyle: this.background,
      stroked: true,
    });
    this.guiLayer?.drawText("Hello World", 100, 100, {
      font: "serif",
      size: 50,
      strokeStyle: this.background,
      fixed: true,
      strokeOnly: false,
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
