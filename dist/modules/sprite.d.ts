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
export declare class Sprite {
    readonly name: string | null;
    private asset;
    private width;
    private height;
    private frames;
    private centerX;
    private centerY;
    private speed;
    constructor(asset: Asset, name?: string | null, frames?: number, centerX?: number, centerY?: number, width?: number, height?: number, speed?: number);
    createInstance(): SpriteInstance;
    setAsset(asset: Asset): void;
    setSize(width: number, height: number): void;
    setCenter(centerX: number, centerY: number): void;
    setFrames(frames: number): void;
    getSize(): iSpriteSize;
    getInfo(): iSpriteInfo;
    draw(canvas: Canvas, x: number, y: number, frame?: number | null, rotation?: number, opacity?: number, filter?: string, width?: number, height?: number): void;
}
export declare class Sprites {
    private sprites;
    constructor();
    create(asset: Asset, name?: string | null, frames?: number, centerX?: number, centerY?: number, width?: number, height?: number, speed?: number): Sprite;
    get(name: string): Sprite | null;
}
export {};
