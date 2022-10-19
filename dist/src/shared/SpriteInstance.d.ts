import { Canvas } from "./Canvas";
import { Sprite } from "../modules/sprite";
export declare class SpriteInstance {
    private sprite;
    frame: number;
    speed: number;
    private frameTime;
    constructor(sprite: Sprite);
    private initEventListeners;
    private updateFrame;
    draw(canvas: Canvas, x: number, y: number, width?: number, height?: number, rotation?: number, opacity?: number, filter?: string): void;
}
