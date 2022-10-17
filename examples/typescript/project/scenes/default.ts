import { Camera } from "../../../../src/modules/camera";
import { Scene } from "../../../../src/modules/scene";
import { Canvas } from "../../../../src/utils/graphic";
import app from "../../app";
import { aWall } from "../assets";
import Player from "../objects/player";

class _DefaultScene extends Scene {
  public width: number = 2000;
  public height: number = 2000;
  private mainCamera?: Camera;

  public init(): void {
    app.instanceBuffer.add(Player);
    this.mainCamera = new Camera(this);
    this.mainCamera.setTrackInstance(Player);
    this.setCamera(this.mainCamera);
  }
}

const DefaultScene = new _DefaultScene();
export default DefaultScene;
