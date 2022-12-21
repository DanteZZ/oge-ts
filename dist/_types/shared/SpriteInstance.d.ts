import { Canvas } from "./Canvas";
import { iSpriteDrawOptions, iSpriteInfo, Sprite } from "../modules/sprite";
export declare class SpriteInstance {
    private sprite;
    frame: number;
    speed: number;
    private frameTime;
    constructor(sprite: Sprite);
    private initEventListeners;
    private updateFrame;
    getInfo(): iSpriteInfo;
    draw(canvas: Canvas, x: number, y: number, opts?: iSpriteDrawOptions): void;
}
