import eventEmitter from "./utils/eventEmitter.js";
import Graphic from "./utils/graphic.js";
import Input from "./utils/input.js";
import { Assets } from "./utils/assets.js";
import { Sprites } from "./modules/sprite.js";
import { InstanceBuffer } from "./modules/instance.js";
import { SceneBuffer } from "./modules/scene.js";
export default class OGE {
    constructor(element) {
        this.fps = 0;
        this.deltaTime = 0;
        this.lastDeltaTime = 0;
        if (element) {
            this.graphic = new Graphic(element);
            this.assets = new Assets();
            this.sprites = new Sprites();
            this.instanceBuffer = new InstanceBuffer();
            this.sceneBuffer = new SceneBuffer(this);
            this.events = eventEmitter;
            this.input = Input;
            this.initEventListeners();
        }
        else {
            throw new Error("Undefined element");
        }
    }
    initEventListeners() {
        this.events.on("afterRender", () => this.calculateDelta());
    }
    calculateDelta() {
        this.fps = Math.round(1000 / (Date.now() - this.lastDeltaTime)) + 1;
        this.deltaTime = (Date.now() - this.lastDeltaTime) / 1000;
        this.lastDeltaTime = Date.now();
    }
    run() {
        this.graphic.playRender();
    }
}
//# sourceMappingURL=oge.js.map