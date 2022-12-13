import { Asset } from "../utils/assets";
import { Canvas } from "../shared/Canvas";
import { SpriteInstance } from "../shared/SpriteInstance";

export interface iSpriteInfo {
  speed: number;
  width: number;
  height: number;
  frames: number;
  centerX: number;
  centerY: number;
  [key: string]: any;
}

interface iSpriteSize {
  width: number;
  height: number;
}

export interface iSpriteDrawOptions {
  frame?: number;
  rotation?: number;
  opacity?: number;
  filter?: string;
  width?: number;
  height?: number;
}

export class Sprite {
  [key: string]: any;
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
    opts?: Partial<iSpriteInfo>
  ) {
    this.asset = asset;
    this.name = name;
    opts &&
      Object.entries(opts).forEach(([key, value]) => {
        this[key] = value;
      });
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
    opts?: iSpriteDrawOptions
  ): void {
    const inf = this.getInfo();
    canvas.drawAsset({
      asset: this.asset,
      x: x - this.centerX,
      y: y - this.centerY,
      dWidth: opts?.width || inf.width,
      dHeight: opts?.height || inf.height,
      sWidth: inf.width,
      sHeight: inf.height,
      offsetX: (opts?.frame || 0) * inf.width,
      offsetY: 0,
      rotation: opts?.rotation,
      filter: opts?.filter,
      opacity: opts?.opacity,
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
    opts?: Partial<iSpriteInfo>
  ): Sprite {
    const sprite = new Sprite(asset, name, opts);
    this.sprites.push(sprite);
    return sprite;
  }
  public get(name: string): Sprite | null {
    return this.sprites.find((sprite) => sprite.name === name) || null;
  }
}
