import { iCanvasItem, iImageInfo } from "../interfaces/graphic";
import eventEmitter from "./eventEmitter";

export default class Graphic {
  private canvasList: iCanvasItem[] = [];
  private rootElement: HTMLElement;

  constructor(rootElement: HTMLElement) {
    this.rootElement = rootElement;
    this.initEventEmitter();
  }

  private initEventEmitter() {
    eventEmitter.on("beforeDraw", () => {
      this.clear();
    });
    eventEmitter.on("afterDraw", () => {
      this.restore();
    });
    window.requestAnimationFrame(() => {
      eventEmitter.emit("updateFrame");
    });
  }

  public getCanvas(name: string): iCanvasItem | null {
    return this.canvasList?.find((item) => item.name === name) || null;
  }

  public createCanvas(name: string): iCanvasItem | null {
    if (!this.getCanvas(name)) {
      const canvasElement = document.createElement("canvas");
      canvasElement.className = "_oge_canvas";
      const canvas: iCanvasItem = {
        name,
        element: canvasElement,
        ctx: canvasElement.getContext("2d"),
        offsetX: 0,
        offsetY: 0,
      };
      this.rootElement.appendChild(canvas.element);
      return canvas;
    } else {
      return null;
    }
  }

  public clear(): void {
    this.canvasList.forEach((canvas) =>
      canvas.ctx?.clearRect(0, 0, canvas.element.width, canvas.element.height)
    );
  }

  public restore(): void {
    this.canvasList.forEach((canvas) => canvas.ctx?.restore());
  }

  public setSize(name: string | iCanvasItem, width: number, height: number) {
    const canvas = typeof name === "string" ? this.getCanvas(name) : name;
    if (canvas) {
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
      if (canvas.element.width !== nw) {
        canvas.element.width = nw;
      }
      if (canvas.element.height !== nh) {
        canvas.element.height = nh;
      }
      return true;
    } else {
      return false;
    }
  }

  public setAllSizes(width: number, height: number) {
    this.canvasList.forEach((canvas) => this.setSize(canvas, width, height));
  }

  public setOffset(name: string, x: number, y: number) {
    const canvas = this.getCanvas(name);
    if (canvas) {
      canvas.offsetX = x;
      canvas.offsetY = y;
      return true;
    } else {
      return false;
    }
  }

  public destroyCanvas(name: string | iCanvasItem): void {
    const canvas = typeof name === "string" ? this.getCanvas(name) : name;
    if (canvas) {
      canvas.element.remove();
      this.canvasList = this.canvasList.filter(
        (canvas) => canvas.name !== name
      );
    }
  }

  public destroyAll(): void {
    this.canvasList.forEach((canvas) => this.destroyCanvas(canvas));
  }

  public drawImage(info: iImageInfo): void {
    let canvas = this.getCanvas(info.canvas);
    if (canvas && canvas.ctx) {
      const ctx = canvas.ctx;
      if (info.rotation) {
        ctx.save();
        ctx.translate(
          info.x - canvas.offsetX + info.dWidth / 2,
          info.y - canvas.offsetY + info.dHeight / 2
        );
        ctx.rotate((info.rotation * Math.PI) / 180);
        ctx.translate(
          -(info.x - canvas.offsetX + info.dWidth / 2),
          -(info.y - canvas.offsetY + info.dHeight / 2)
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
        info.image,

        info.offsetX,
        info.offsetY,
        info.sWidth,
        info.sHeight,

        info.x - canvas.offsetX,
        info.y - canvas.offsetY,
        info.dWidth,
        info.dHeight
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
