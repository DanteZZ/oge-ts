import eventEmitter, { EventEmitter } from "./utils/eventEmitter";
import Graphic from "./utils/graphic";
import Input, { InputBuffer } from "./utils/input";
import { Assets } from "./utils/assets";
import { Sprites } from "./modules/sprite";
import { InstanceBuffer } from "./modules/instance";
import { SceneBuffer } from "./modules/scene";
import { ColliderBuffer } from "./modules/collider";

export default class OGE {
  [key: string]: any;
  public events: EventEmitter;
  public graphic: Graphic;
  public assets: Assets;
  public sprites: Sprites;
  public instanceBuffer: InstanceBuffer;
  public colliderBuffer: ColliderBuffer;
  public sceneBuffer: SceneBuffer;
  public input: InputBuffer;

  public fps: number = 0;
  public deltaTime: number = 0;
  public lastDeltaTime: number = 0;

  constructor(element: HTMLElement | null) {
    if (element) {
      this.graphic = new Graphic(element);
      this.assets = new Assets();
      this.sprites = new Sprites();
      this.instanceBuffer = new InstanceBuffer(this);
      this.colliderBuffer = new ColliderBuffer();
      this.sceneBuffer = new SceneBuffer(this);

      this.events = eventEmitter;
      this.input = Input;
      this.initEventListeners();
    } else {
      throw new Error("Undefined element");
    }
  }

  private initEventListeners(): void {
    this.events.on("afterRender", () => this.calculateDelta());
  }

  private calculateDelta(): void {
    this.fps = Math.round(1000 / (Date.now() - this.lastDeltaTime)) + 1;
    this.deltaTime = (Date.now() - this.lastDeltaTime) / 1000;
    this.lastDeltaTime = Date.now();
  }

  public run(): void {
    this.graphic.playRender();
  }
}
