import { Asset, AssetPattern } from "../utils/assets";
import { Canvas } from "../shared/Canvas";
export interface iCanvasItem {
    name: string;
    element: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    offsetX: number;
    offsetY: number;
}
export interface iImageInfo {
    canvas?: string | Canvas;
    asset: Asset;
    x: number;
    y: number;
    dWidth?: number;
    dHeight?: number;
    sWidth?: number;
    sHeight?: number;
    offsetX?: number;
    offsetY?: number;
    rotation?: number;
    filter?: string;
    opacity?: number;
}
export interface iRectInfo {
    canvas?: string | Canvas;
    fillStyle?: string | AssetPattern;
    strokeOnly?: Boolean;
    stroked?: Boolean;
    strokeStyle?: string | AssetPattern;
    fixed?: Boolean;
}
export interface iTextInfo {
    font?: string;
    canvas?: string | Canvas;
    textAlign?: CanvasTextAlign;
    fillStyle?: string | AssetPattern;
    strokeOnly?: Boolean;
    stroked?: Boolean;
    strokeStyle?: string | AssetPattern;
    fixed?: Boolean;
}
