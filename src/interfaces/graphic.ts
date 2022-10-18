import { Asset } from "../utils/assets";
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
