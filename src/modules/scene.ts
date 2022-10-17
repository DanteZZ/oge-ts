import OGE from "..";
import eventEmitter from "../utils/eventEmitter";
import { Canvas } from "../utils/graphic";
import { Camera } from "./camera";

export abstract class Scene {
  public name: string | null = null;
  public width: number = 0;
  public height: number = 0;
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
  public draw(canvas?: Canvas): void {}

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

  public _setName(name: string): void {
    this.name = name;
  }

  public _setBuffer(buffer: SceneBuffer): void {
    this.buffer = buffer;
  }
}

export class SceneBuffer {
  private scenes: Scene[];
  private selected?: Scene;
  private mainCanvas?: Canvas;
  private context: OGE;

  constructor(context: OGE, selected?: Scene, canvas?: Canvas) {
    this.scenes = [];
    if (selected) {
      this.add(selected);
      this.selected = selected;
    }
    this.mainCanvas = canvas;
    this.context = context;
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
    eventEmitter.on("afterRender", () => this.update());
    eventEmitter.on("render", () => this.draw());
  }

  private update(): void {
    if (this.selected) {
      this.selected._update(this.mainCanvas);
      this.selected?.update();
    }
  }

  private draw(): void {
    if (this.selected) {
      this.selected?.draw();
    }
  }

  public add(scene: Scene): Scene {
    this.scenes.push(scene);
    scene._setBuffer(this);
    return scene;
  }

  public get(name: string): Scene | null {
    return this.scenes.find((scene) => scene.name === name) || null;
  }

  public destroy(scene: Scene) {
    this.scenes = this.scenes.filter((sc) => sc !== scene);
  }
}
