import { iImageInfo } from "../interfaces/graphic";
import { Canvas } from "../shared/Canvas";
import eventEmitter from "./eventEmitter";

export default class Graphic {
  private canvasList: Canvas[] = [];
  private rootElement: HTMLElement;
  private isRender: Boolean = false;

  constructor(rootElement: HTMLElement) {
    this.rootElement = rootElement;
    rootElement.style.position = "relative";
  }

  private updateFrame(): void {
    if (this.isRender) {
      this.clear();
      eventEmitter.emit("beforeRender");
      eventEmitter.emit("preRender");
      eventEmitter.emit("render");
      eventEmitter.emit("postRender");
      setTimeout(() => {
        eventEmitter.emit("afterRender");
      }, 0);
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
    width: number = 0,
    height: number = 0
  ): Canvas {
    if (!this.getCanvas(name)) {
      const canvas = new Canvas(this.rootElement, name, width, height);
      this.canvasList.push(canvas);
      return canvas;
    } else {
      throw new Error(`Canvas "${name}" already exist`);
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

  public setSize(name: string | Canvas, width: number, height: number) {
    const canvas = typeof name === "string" ? this.getCanvas(name) : name;
    if (canvas) {
      canvas.setSize(width, height);
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
      canvas.setOffset(x, y);
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

  public drawAsset(info: iImageInfo): void {
    if (info.canvas) {
      let canvas =
        info.canvas instanceof Canvas
          ? info.canvas
          : this.getCanvas(info.canvas);
      canvas?.drawAsset(info);
    }
  }
}
