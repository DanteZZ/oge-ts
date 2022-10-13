import eventEmitter, { EventEmitter } from "./utils/eventEmitter";
import Graphic from "./utils/graphic";
import { Assets } from "./utils/assets";
import { Sprites } from "./modules/sprite";

export default class OGE {
  [key: string]: any;
  private events: EventEmitter;
  private graphic: Graphic;
  private assets: Assets;
  private sprites: Sprites;

  private fps: number = 0;
  private deltaTime: number = 0;
  private lastDeltaTime: number = 0;

  constructor(element: HTMLElement) {
    this.graphic = new Graphic(element);
    this.assets = new Assets();
    this.sprites = new Sprites();

    this.events = eventEmitter;
    this.initEventListeners();
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
