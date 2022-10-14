import eventEmitter, { EventEmitter } from "./utils/eventEmitter";
import Graphic from "./utils/graphic";
import { Assets } from "./utils/assets";
import { Sprites } from "./modules/sprite";
import { GameObject, InstanceBuffer } from "./modules/gameObject";

export default class OGE {
  [key: string]: any;
  public events: EventEmitter;
  public graphic: Graphic;
  public assets: Assets;
  public sprites: Sprites;
  public instanceBuffer: InstanceBuffer;

  public fps: number = 0;
  public deltaTime: number = 0;
  public lastDeltaTime: number = 0;

  public GameObject = GameObject;

  constructor(element: HTMLElement | null) {
    if (element) {
      this.graphic = new Graphic(element);
      this.assets = new Assets();
      this.sprites = new Sprites();
      this.instanceBuffer = new InstanceBuffer();

      this.events = eventEmitter;
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
