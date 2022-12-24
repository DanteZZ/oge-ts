import { iCanvasItem, iRectInfo, iTextInfo } from "../interfaces/graphic";
import { iImageInfo } from "../interfaces/graphic";
export declare class Canvas implements iCanvasItem {
    name: string;
    element: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    offsetX: number;
    offsetY: number;
    scale: number;
    constructor(rootElement: HTMLElement, name: string, width?: number, height?: number);
    drawAsset(info: iImageInfo): void;
    drawRect(x: number, y: number, width: number, height: number, info?: iRectInfo): void;
    drawArc(x: number, y: number, radius: number, startAngle?: number, endAngle?: number, info?: iRectInfo): void;
    drawText(text: string, x: number, y: number, info?: iTextInfo): void;
    setOffset(x: number, y: number): void;
    setSize(width?: number, height?: number): void;
}
