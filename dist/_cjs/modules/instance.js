"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstanceBuffer = void 0;
const eventEmitter_1 = require("../utils/eventEmitter");
class InstanceBuffer {
    constructor(canvas) {
        this.instances = [];
        this.canvas = canvas;
        this.initEventListeners();
    }
    setCanvas(canvas) {
        this.canvas = canvas;
    }
    getCanvas() {
        if (this.canvas) {
            return this.canvas;
        }
        else {
            throw new Error("Empty canvas");
        }
    }
    initEventListeners() {
        eventEmitter_1.default.on("afterRender", () => this.update());
        eventEmitter_1.default.on("render", () => this.draw());
    }
    update() {
        this.instances.forEach((instance) => {
            try {
                instance === null || instance === void 0 ? void 0 : instance.update();
            }
            catch (e) {
                console.error("Can't update", instance);
            }
        });
    }
    draw() {
        this.instances
            .sort((a, b) => a.depth - b.depth)
            .forEach((instance) => {
            try {
                instance === null || instance === void 0 ? void 0 : instance.draw(this.canvas);
            }
            catch (e) {
                console.error("Can't draw", instance);
            }
        });
    }
    add(instance) {
        this.instances.push(instance);
        instance._setBuffer(this);
        return instance;
    }
    addInstances(instances) {
        instances.forEach((instance) => {
            this.instances.push(instance);
            instance._setBuffer(this);
        });
        return instances;
    }
    get(name) {
        return this.instances.find((instance) => instance.name === name) || null;
    }
    destroy(instance) {
        this.instances = this.instances.filter((inst) => inst !== instance);
    }
    destroyAll() {
        this.instances.forEach((inst) => inst.onDestroy());
        this.instances = [];
    }
}
exports.InstanceBuffer = InstanceBuffer;
//# sourceMappingURL=instance.js.map