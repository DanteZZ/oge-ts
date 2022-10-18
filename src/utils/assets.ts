import { iJsonAsset } from "../interfaces/assets";
import { Canvas } from "../shared/Canvas";
import resourceLoader from "./resourceLoader";

export class Asset {
  readonly url: string;
  readonly name: string | null;
  constructor(url: string, name: string | null = null) {
    resourceLoader.addToLoad(url);
    this.url = url;
    this.name = name;
  }
  public getResource(): HTMLImageElement | Boolean {
    return resourceLoader.get(this.url);
  }
}

export class Assets {
  private assets: Asset[];
  constructor() {
    this.assets = [];
  }
  public create(url: string, name: string | null = null): Asset {
    const asset = new Asset(url, name);
    this.assets.push(asset);
    return asset;
  }
  public createAssets(assets: iJsonAsset[]): Asset[] {
    const result: Asset[] = [];
    assets.forEach((asset) => result.push(this.create(asset.url, asset.name)));
    return result;
  }
  public get(name: string): Asset | null {
    return this.assets.find((asset) => asset.name === name) || null;
  }
  public getByUrl(url: string): Asset | null {
    return this.assets.find((asset) => asset.url === url) || null;
  }
  public loadAssets() {
    return new Promise((res, rej) => {
      resourceLoader.onReady(res);
      resourceLoader.loadResources();
    });
  }
}

export class AssetPattern {
  private pattern: CanvasPattern | null = null;
  private canvas: Canvas;
  private asset: Asset;
  private type: string = "repeat";

  constructor(canvas: Canvas, asset: Asset, type: string = "repeat") {
    this.canvas = canvas;
    this.asset = asset;
    this.type = type;
  }

  public getPattern(): CanvasPattern {
    const res = this.asset.getResource();
    if (res instanceof HTMLImageElement) {
      if (!this.pattern) {
        this.pattern = this.canvas.ctx.createPattern(res, this.type);
      }
      if (this.pattern) {
        return this.pattern;
      } else {
        throw new Error("Pattern is not created");
      }
    } else {
      throw new Error("Asset is not loaded");
    }
  }
}
