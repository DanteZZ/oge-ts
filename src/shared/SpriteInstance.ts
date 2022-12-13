import eventEmitter from "../utils/eventEmitter";
import { Canvas } from "./Canvas";
import { iSpriteInfo, Sprite } from "../modules/sprite";

export class SpriteInstance {
  private sprite: Sprite;
  public frame: number = 0;
  public speed: number = 1;
  private frameTime: number = Date.now();

  constructor(sprite: Sprite) {
    this.sprite = sprite;
    this.initEventListeners();
  }

  private initEventListeners() {
    eventEmitter.on("afterRender", () => this.updateFrame());
  }

  private updateFrame(): void {
    const info = this.sprite.getInfo();
    if (info.frames > 1) {
      if (this.speed > 0 && info.speed > 0) {
        if (
          Date.now() >=
          this.frameTime + 1000 * (info.speed / info.frames) * this.speed
        ) {
          this.frameTime = Date.now();
          if (this.frame == info.frames - 1) {
            this.frame = 0;
          } else {
            this.frame++;
          }
        }
      }
    }
  }

  public getInfo(): iSpriteInfo {
    return this.sprite.getInfo();
  }

  public draw(
    canvas: Canvas,
    x: number,
    y: number,
    width?: number,
    height?: number,
    rotation?: number,
    opacity?: number,
    filter?: string
  ): void {
    this.sprite.draw(canvas, x, y, {
      frame: this.frame,
      rotation,
      opacity,
      filter,
      width,
      height,
    });
  }
}
