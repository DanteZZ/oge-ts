import { iImageInfo } from "../interfaces/graphic";
import { Canvas } from "../shared/Canvas";
export default class Graphic {
    private canvasList;
    private rootElement;
    private isRender;
    constructor(rootElement: HTMLElement);
    private updateFrame;
    stopRender(): void;
    playRender(): void;
    getCanvas(name: string): Canvas | null;
    createCanvas(name: string, width?: number, height?: number): Canvas;
    clear(): void;
    restore(): void;
    setSize(name: string | Canvas, width: number, height: number): boolean;
    setAllSizes(width: number, height: number): void;
    setOffset(name: string, x: number, y: number): boolean;
    destroyCanvas(name: string | Canvas): void;
    destroyAll(): void;
    drawAsset(info: iImageInfo): void;
}
