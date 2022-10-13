import { iCanvasItem, iImageInfo } from "../interfaces/graphic";
import eventEmitter from "./eventEmitter";

export default class Graphic {
  private canvasList: Canvas[] = [];
  private rootElement: HTMLElement;
  private isRender: Boolean = false;

  constructor(rootElement: HTMLElement) {
    this.rootElement = rootElement;
  }

  private updateFrame(): void {
    if (this.isRender) {
      this.clear();
      eventEmitter.emit("beforeRender");
      eventEmitter.emit("render");
      eventEmitter.emit("afterRender");
      this.restore();
      window.requestAnimationFrame(() => {
        this.updateFrame();
      });
    }
  }

  public stopRender(): void {
    this.isRender = false;
  }

  public playRender(): void {
    this.isRender = true;
    this.updateFrame();
  }

  public getCanvas(name: string): Canvas | null {
    return this.canvasList?.find((item) => item.name === name) || null;
  }

  public createCanvas(
    name: string,
    width: number,
    height: number
  ): Canvas | null {
    if (!this.getCanvas(name)) {
      const canvas = new Canvas(this.rootElement, name, width, height);
      this.canvasList.push(canvas);
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

  public destroyCanvas(name: string | Canvas): void {
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
    if (info.canvas) {
      let canvas =
        info.canvas instanceof Canvas
          ? info.canvas
          : this.getCanvas(info.canvas);
      canvas?.drawImage(info);
    }
  }
}

export class Canvas implements iCanvasItem {
  public ctx;
  public element;
  public name;
  public offsetX;
  public offsetY;
  constructor(
    rootElement: HTMLElement,
    name: string,
    width: number,
    height: number
  ) {
    const canvasElement = document.createElement("canvas");
    canvasElement.className = "_oge_canvas";
    this.name = name;
    this.element = canvasElement;
    this.ctx = canvasElement.getContext("2d");
    this.offsetX = 0;
    this.offsetY = 0;
    this.element.width = width;
    this.element.height = height;
    rootElement.appendChild(this.element);
  }
  public drawImage(info: iImageInfo) {
    const ctx = this.ctx;
    if (ctx) {
      if (info.rotation) {
        ctx.save();
        ctx.translate(
          info.x - this.offsetX + info.dWidth / 2,
          info.y - this.offsetY + info.dHeight / 2
        );
        ctx.rotate((info.rotation * Math.PI) / 180);
        ctx.translate(
          -(info.x - this.offsetX + info.dWidth / 2),
          -(info.y - this.offsetY + info.dHeight / 2)
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

        info.x - this.offsetX,
        info.y - this.offsetY,
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
