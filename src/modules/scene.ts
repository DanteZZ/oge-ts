import OGE from "..";
import eventEmitter from "../utils/eventEmitter";
import { Canvas } from "../shared/Canvas";
import { Camera } from "./camera";
import { InstanceBuffer } from "./instance";

const nullInstanceBuffer: InstanceBuffer = new InstanceBuffer();

export abstract class Scene {
  public name: string | null = null;
  public width: number = 0;
  public height: number = 0;
  public instances: InstanceBuffer = nullInstanceBuffer;
  private buffer?: SceneBuffer;
  private camera?: Camera;

  public _init(context: OGE): void {
    context.instanceBuffer.destroyAll();
    this.init();
  }

  public _update(canvas?: Canvas): void {
    if (this.camera && canvas) {
      this.camera.update(canvas);
    }
  }

  public init(): void {}
  public update(): void {}
  public draw(canvas: Canvas): void {}

  public setCamera(camera: Camera): void {
    this.camera = camera;
  }

  public destroy(): void {
    this?.buffer?.destroy(this);
  }

  public getBuffer(): SceneBuffer {
    if (this.buffer) {
      return this.buffer;
    } else {
      throw new Error("Empty buffer");
    }
  }

  public getCanvas(): Canvas {
    return this.getBuffer().getCanvas();
  }

  public getInstanceBuffer(): InstanceBuffer {
    if (this.instances) {
      return this.instances;
    } else {
      throw new Error("Empty buffer");
    }
  }

  public _setName(name: string): void {
    this.name = name;
  }

  public _setBuffer(buffer: SceneBuffer): void {
    this.buffer = buffer;
  }

  public _setInstanceBuffer(buffer: InstanceBuffer): void {
    this.instances = buffer;
  }
}

export class SceneBuffer {
  private scenes: Scene[];
  private selected?: Scene;
  private mainCanvas?: Canvas;
  private context: OGE;

  constructor(context: OGE, selected?: Scene, canvas?: Canvas) {
    this.scenes = [];
    this.mainCanvas = canvas;
    this.context = context;
    if (selected) {
      this.add(selected);
      this.selected = selected;
    }

    this.initEventListeners();
  }

  public initScene() {
    if (this.selected) {
      this.selected._init(this.context);
    }
  }

  public setScene(scene: Scene): SceneBuffer {
    this.selected = scene;
    return this;
  }

  public setCanvas(canvas: Canvas): SceneBuffer {
    this.mainCanvas = canvas;
    return this;
  }

  public getCanvas(): Canvas {
    if (this.mainCanvas) {
      return this.mainCanvas;
    } else {
      throw new Error("Empty canvas");
    }
  }

  private initEventListeners() {
    eventEmitter.on("beforeRender", () => this.update());
    eventEmitter.on("preRender", () => this.draw());
  }

  private update(): void {
    if (this.selected) {
      this.selected._update(this.mainCanvas);
      this.selected?.update();
    }
  }

  private draw(): void {
    if (this.mainCanvas && this.selected) {
      this.selected?.draw(this.mainCanvas);
    }
  }

  public add(scene: Scene): Scene {
    this.scenes.push(scene);
    scene._setBuffer(this);
    scene._setInstanceBuffer(this.context.instanceBuffer);
    return scene;
  }

  public get(name: string): Scene | null {
    return this.scenes.find((scene) => scene.name === name) || null;
  }

  public destroy(scene: Scene) {
    this.scenes = this.scenes.filter((sc) => sc !== scene);
  }
}
