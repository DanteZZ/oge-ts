import { iJsonAsset } from "../interfaces/assets";
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
  create(url: string, name: string | null = null): Asset {
    const asset = new Asset(url, name);
    this.assets.push(asset);
    return asset;
  }
  createAssets(assets: iJsonAsset[]): Asset[] {
    const result: Asset[] = [];
    assets.forEach((asset) => result.push(this.create(asset.url, asset.name)));
    return result;
  }
  get(name: string): Asset | null {
    return this.assets.find((asset) => asset.name === name) || null;
  }
  getByUrl(url: string): Asset | null {
    return this.assets.find((asset) => asset.url === url) || null;
  }
}
