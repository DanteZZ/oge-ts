import eventEmitter from "../utils/eventEmitter";
import { Canvas } from "../utils/graphic";
import { SpriteInstance } from "./sprite";

export abstract class GameObject {
  public name: string | null = null;
  public x: number = 0;
  public y: number = 0;
  public sprite: SpriteInstance | null = null;
  private buffer?: InstanceBuffer;

  public update(): void {}

  public draw(canvas?: Canvas): void {
    if (canvas && this.sprite instanceof SpriteInstance) {
      this.sprite.draw(canvas, this.x, this.y);
    }
  }

  public destroy(): void {
    this?.buffer?.destroy(this);
  }

  public onDestroy(): void {}

  public getBuffer(): InstanceBuffer {
    if (this.buffer) {
      return this.buffer;
    } else {
      throw new Error("Empty buffer");
    }
  }

  public _setName(name: string): void {
    this.name = name;
  }

  public _setBuffer(buffer: InstanceBuffer): void {
    this.buffer = buffer;
  }
}

export class InstanceBuffer {
  private instances: GameObject[];
  private canvas?: Canvas;
  constructor(canvas?: Canvas) {
    this.instances = [];
    this.canvas = canvas;
    this.initEventListeners();
  }

  public setCanvas(canvas: Canvas) {
    this.canvas = canvas;
  }

  public getCanvas(): Canvas {
    if (this.canvas) {
      return this.canvas;
    } else {
      throw new Error("Empty canvas");
    }
  }

  private initEventListeners() {
    eventEmitter.on("afterRender", () => this.update());
    eventEmitter.on("render", () => this.draw());
  }

  private update(): void {
    this.instances.forEach((instance) => {
      try {
        instance?.update();
      } catch (e) {
        console.error("Can't update", instance);
      }
    });
  }

  private draw(): void {
    this.instances.forEach((instance) => {
      try {
        instance?.draw(this.canvas);
      } catch (e) {
        console.error("Can't draw", instance);
      }
    });
  }

  public add(instance: GameObject): GameObject {
    this.instances.push(instance);
    instance._setBuffer(this);
    return instance;
  }
  public get(name: string): GameObject | null {
    return this.instances.find((instance) => instance.name === name) || null;
  }

  public destroy(instance: GameObject) {
    this.instances = this.instances.filter((inst) => inst !== instance);
  }

  public destroyAll() {
    this.instances.forEach((inst) => inst.onDestroy());
    this.instances = [];
  }
}
