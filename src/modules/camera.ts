import { Canvas } from "../shared/Canvas";
import { Scene } from "./scene";

import { GameObject } from "../shared/GameObject";

export class Camera {
  public name: string | null = null;
  public width: number = 0;
  public height: number = 0;
  public x: number = 0;
  public y: number = 0;
  public trackInstance?: GameObject;
  private scene: Scene;

  constructor(scene: Scene, trackInstance?: GameObject) {
    this.scene = scene;
    this.trackInstance = trackInstance;
  }

  public update(canvas: Canvas): void {
    let w = 0;
    let h = 0;
    if (this.width) {
      w = this.width;
    } else {
      w = window.innerWidth;
    }
    if (this.height) {
      h = this.height;
    } else {
      h = window.innerHeight;
    }
    canvas.setSize(w, h);

    if (this.trackInstance) {
      this.x = this.trackInstance.x - Math.ceil(w / 2 / canvas.scale);
      this.y = this.trackInstance.y - Math.ceil(h / 2 / canvas.scale);
    }

    if (this.x < 0) {
      this.x = 0;
    }
    if (this.y < 0) {
      this.y = 0;
    }

    w = Math.ceil(w / canvas.scale);
    h = Math.ceil(h / canvas.scale);

    if (this.x + w > this.scene.width) {
      this.x = this.scene.width - w;
    }
    if (this.y + h > this.scene.height) {
      this.y = this.scene.height - h;
    }

    if (w > this.scene.width) {
      this.x = -(w - this.scene.width) / 2;
    }
    if (h > this.scene.height) {
      this.y = -(h - this.scene.height) / 2;
    }
    canvas.setOffset(this.x, this.y);
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setScene(scene: Scene): void {
    this.scene = scene;
  }

  public setTrackInstance(trackInstance: GameObject): void {
    this.trackInstance = trackInstance;
  }
}
