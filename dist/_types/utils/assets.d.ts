import { iJsonAsset } from "../interfaces/assets";
import { Canvas } from "../shared/Canvas";
export declare class Asset {
    readonly url: string;
    readonly name: string | null;
    constructor(url: string, name?: string | null);
    getResource(): HTMLImageElement | Boolean;
}
export declare class Assets {
    private assets;
    constructor();
    create(url: string, name?: string | null): Asset;
    createAssets(assets: iJsonAsset[]): Asset[];
    get(name: string): Asset | null;
    getByUrl(url: string): Asset | null;
    loadAssets(): Promise<unknown>;
}
export declare class AssetPattern {
    private pattern;
    private canvas;
    private asset;
    private type;
    constructor(canvas: Canvas, asset: Asset, type?: string);
    getPattern(): CanvasPattern;
}
