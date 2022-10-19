import { iCanvasItem } from "../interfaces/graphic";
import { iImageInfo } from "../interfaces/graphic";
export declare class Canvas implements iCanvasItem {
    name: string;
    element: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    offsetX: number;
    offsetY: number;
    constructor(rootElement: HTMLElement, name: string, width?: number, height?: number);
    drawAsset(info: iImageInfo): void;
    setOffset(x: number, y: number): void;
    setSize(width?: number, height?: number): void;
}
