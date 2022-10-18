import eventEmitter from "../utils/eventEmitter";
import { Canvas } from "../shared/Canvas";
import { GameObject } from "../shared/GameObject";

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
    this.instances
      .sort((a, b) => a.depth - b.depth)
      .forEach((instance) => {
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

  public addInstances(instances: GameObject[]): GameObject[] {
    instances.forEach((instance) => {
      this.instances.push(instance);
      instance._setBuffer(this);
    });
    return instances;
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
