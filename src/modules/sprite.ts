import { Asset } from "../utils/assets";
import { Canvas } from "../shared/Canvas";
import { SpriteInstance } from "../shared/SpriteInstance";

interface iSpriteInfo {
  speed: number;
  width: number;
  height: number;
  frames: number;
  centerX: number;
  centerY: number;
}

interface iSpriteSize {
  width: number;
  height: number;
}

export class Sprite {
  readonly name: string | null = null;
  private asset: Asset;
  private width: number = 0;
  private height: number = 0;
  private frames: number = 1;
  private centerX: number = 0;
  private centerY: number = 0;
  private speed: number = 1;

  constructor(
    asset: Asset,
    name: string | null = null,
    frames: number = 1,
    centerX: number = 0,
    centerY: number = 0,
    width: number = 0,
    height: number = 0,
    speed: number = 1
  ) {
    this.asset = asset;
    this.speed = speed;
    this.name = name;
    this.width = width;
    this.height = height;
    this.frames = frames;
    this.centerX = centerX;
    this.centerY = centerY;
  }

  public createInstance(): SpriteInstance {
    return new SpriteInstance(this);
  }

  public setAsset(asset: Asset): void {
    this.asset = asset;
  }

  public setSize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  public setCenter(centerX: number, centerY: number): void {
    this.centerX = centerX;
    this.centerY = centerY;
  }

  public setFrames(frames: number): void {
    this.frames = frames;
  }

  public getSize(): iSpriteSize {
    const res = this.asset.getResource();
    if (res instanceof HTMLImageElement) {
      let width = this.width || res.width;
      let height = this.height || res.height;

      if (this.frames > 1) {
        width = Math.ceil(width / this.frames);
      }

      return { width, height };
    } else {
      throw new Error("Undefined asset");
    }
  }

  public getInfo(): iSpriteInfo {
    const size = this.getSize();
    return {
      speed: this.speed,
      frames: this.frames,
      centerX: this.centerX,
      centerY: this.centerY,
      ...size,
    };
  }

  public draw(
    canvas: Canvas,
    x: number,
    y: number,
    frame: number | null = null,
    rotation?: number,
    opacity?: number,
    filter?: string,
    width?: number,
    height?: number
  ): void {
    const inf = this.getInfo();
    canvas.drawAsset({
      asset: this.asset,
      x,
      y,
      dWidth: width || inf.width,
      dHeight: height || inf.height,
      sWidth: inf.width,
      sHeight: inf.height,
      offsetX: (frame || 0) * inf.width,
      offsetY: 0,
      rotation: rotation,
      filter: filter,
      opacity: opacity,
    });
  }
}

export class Sprites {
  private sprites: Sprite[];
  constructor() {
    this.sprites = [];
  }
  public create(
    asset: Asset,
    name: string | null = null,
    frames: number = 1,
    centerX: number = 0,
    centerY: number = 0,
    width: number = 0,
    height: number = 0,
    speed: number = 1
  ): Sprite {
    const sprite = new Sprite(
      asset,
      name,
      frames,
      centerX,
      centerY,
      width,
      height,
      speed
    );
    this.sprites.push(sprite);
    return sprite;
  }
  public get(name: string): Sprite | null {
    return this.sprites.find((sprite) => sprite.name === name) || null;
  }
}
