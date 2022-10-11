import Graphic from "./utils/graphic";
import { Assets } from "./utils/assets";
import eventEmitter, { EventEmitter } from "./utils/eventEmitter";
export default class OGE {
  private graphic: Graphic;
  private assets: Assets;
  private events: EventEmitter;
  constructor(element: HTMLElement) {
    this.graphic = new Graphic(element);
    this.assets = new Assets();
    this.events = eventEmitter;
  }
}
