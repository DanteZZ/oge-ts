import { Asset } from "../utils/assets";

interface iSpriteInfo {
  width: number;
  height: number;
  frames: number;
  centerX: number;
  centerY: number;
}

export class Sprite {
  readonly name: string | null = null;
  private asset: Asset;
  private width: number = 0;
  private height: number = 0;
  private frames: number = 1;
  private centerX: number = 0;
  private centerY: number = 0;

  constructor(
    asset: Asset,
    name: string | null = null,
    frames: number = 1,
    centerX: number = 0,
    centerY: number = 0,
    width: number = 0,
    height: number = 0
  ) {
    this.asset = asset;
    this.name = name;
    this.width = width;
    this.height = height;
    this.frames = frames;
    this.centerX = centerX;
    this.centerY = centerY;
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

  public getResource() {
    this.asset.getResource();
  }

  public getInfo(): iSpriteInfo {
    return {
      width: this.width,
      height: this.height,
      frames: this.frames,
      centerX: this.centerX,
      centerY: this.centerY,
    };
  }
}
