import { Canvas } from "../utils/graphic";

export interface iCanvasItem {
  name: string;
  element: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  offsetX: number;
  offsetY: number;
}

export interface iImageInfo {
  canvas?: string | Canvas;
  image: CanvasImageSource;
  x: number;
  y: number;
  dWidth: number;
  dHeight: number;
  sWidth: number;
  sHeight: number;
  offsetX: number;
  offsetY: number;
  rotation?: number;
  filter?: string;
  opacity?: number;
}
