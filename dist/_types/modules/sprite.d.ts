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
export declare class Sprite {
    [key: string]: any;
    readonly name: string | null;
    private asset;
    private width;
    private height;
    private frames;
    private centerX;
    private centerY;
    private speed;
    constructor(asset: Asset, name?: string | null, opts?: Partial<iSpriteInfo>);
    createInstance(): SpriteInstance;
    setAsset(asset: Asset): void;
    setSize(width: number, height: number): void;
    setCenter(centerX: number, centerY: number): void;
    setFrames(frames: number): void;
    getSize(): iSpriteSize;
    getInfo(): iSpriteInfo;
    draw(canvas: Canvas, x: number, y: number, opts?: iSpriteDrawOptions): void;
}
export declare class Sprites {
    private sprites;
    constructor();
    create(asset: Asset, name?: string | null, opts?: Partial<iSpriteInfo>): Sprite;
    get(name: string): Sprite | null;
}
export {};
