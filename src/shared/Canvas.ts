import { iCanvasItem } from "../interfaces/graphic";
import { iImageInfo } from "../interfaces/graphic";

export class Canvas implements iCanvasItem {
  public name: string;
  public element: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public offsetX: number;
  public offsetY: number;
  constructor(
    rootElement: HTMLElement,
    name: string,
    width?: number,
    height?: number
  ) {
    const canvasElement = document.createElement("canvas");
    canvasElement.className = "_oge_canvas";
    const ctx = canvasElement.getContext("2d");
    if (!ctx) {
      throw new Error("Can't create 2d context");
    }
    this.ctx = ctx;
    this.name = name;
    this.element = canvasElement;

    this.offsetX = 0;
    this.offsetY = 0;
    this.setSize(width, height);
    rootElement.appendChild(this.element);
  }
  public drawAsset(info: iImageInfo) {
    const ctx = this.ctx;
    if (ctx) {
      const imageSource = info.asset.getResource();

      if (imageSource instanceof HTMLImageElement) {
        const sWidth: number = info.dWidth || imageSource.width;
        const sHeight: number = info.dHeight || imageSource.height;
        const dWidth: number = info.dWidth || imageSource.width;
        const dHeight: number = info.dHeight || imageSource.height;

        if (info.rotation) {
          ctx.save();
          ctx.translate(
            info.x - this.offsetX + dWidth / 2,
            info.y - this.offsetY + dHeight / 2
          );
          ctx.rotate((info.rotation * Math.PI) / 180);
          ctx.translate(
            -(info.x - this.offsetX + dWidth / 2),
            -(info.y - this.offsetY + dHeight / 2)
          );
        }

        if (info.filter) {
          ctx.save();
          ctx.filter = info.filter;
        }

        if (info.opacity !== 1) {
          ctx.save();
          ctx.globalAlpha = info.opacity || 1;
        }

        ctx.drawImage(
          imageSource,
          info.offsetX || 0,
          info.offsetY || 0,
          sWidth,
          sHeight,
          info.x - (this.offsetX || 0),
          info.y - (this.offsetY || 0),
          dWidth,
          dHeight
        );
        if (info.rotation) {
          ctx.restore();
        }
        if (info.opacity !== 1) {
          ctx.restore();
          ctx.globalAlpha = 1;
        }
        if (info.filter) {
          ctx.restore();
          ctx.filter = "";
        }
      }
    }
  }

  public setOffset(x: number, y: number) {
    this.offsetX = x;
    this.offsetY = y;
  }

  public setSize(width: number = 0, height: number = 0) {
    let nw: number, nh: number;
    if (!width) {
      nw = window.innerWidth;
    } else {
      nw = width;
    }
    if (!height) {
      nh = window.innerHeight;
    } else {
      nh = height;
    }
    if (this.element.width !== nw) {
      this.element.width = nw;
    }
    if (this.element.height !== nh) {
      this.element.height = nh;
    }
  }
}
