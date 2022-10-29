"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventEmitter_1 = require("./utils/eventEmitter");
const graphic_1 = require("./utils/graphic");
const input_1 = require("./utils/input");
const assets_1 = require("./utils/assets");
const sprite_1 = require("./modules/sprite");
const instance_1 = require("./modules/instance");
const scene_1 = require("./modules/scene");
class OGE {
    constructor(element) {
        this.fps = 0;
        this.deltaTime = 0;
        this.lastDeltaTime = 0;
        if (element) {
            this.graphic = new graphic_1.default(element);
            this.assets = new assets_1.Assets();
            this.sprites = new sprite_1.Sprites();
            this.instanceBuffer = new instance_1.InstanceBuffer();
            this.sceneBuffer = new scene_1.SceneBuffer(this);
            this.events = eventEmitter_1.default;
            this.input = input_1.default;
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
exports.default = OGE;
//# sourceMappingURL=oge.js.map