"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneBuffer = exports.Scene = void 0;
const eventEmitter_1 = require("../utils/eventEmitter");
const instance_1 = require("./instance");
const nullInstanceBuffer = new instance_1.InstanceBuffer();
class Scene {
    constructor() {
        this.name = null;
        this.width = 0;
        this.height = 0;
        this.instances = nullInstanceBuffer;
    }
    _init(context) {
        context.instanceBuffer.destroyAll();
        this.init();
    }
    _update(canvas) {
        if (this.camera && canvas) {
            this.camera.update(canvas);
        }
    }
    init() { }
    update() { }
    draw(canvas) { }
    setCamera(camera) {
        this.camera = camera;
    }
    destroy() {
        var _a;
        (_a = this === null || this === void 0 ? void 0 : this.buffer) === null || _a === void 0 ? void 0 : _a.destroy(this);
    }
    getBuffer() {
        if (this.buffer) {
            return this.buffer;
        }
        else {
            throw new Error("Empty buffer");
        }
    }
    getCanvas() {
        return this.getBuffer().getCanvas();
    }
    getInstanceBuffer() {
        if (this.instances) {
            return this.instances;
        }
        else {
            throw new Error("Empty buffer");
        }
    }
    _setName(name) {
        this.name = name;
    }
    _setBuffer(buffer) {
        this.buffer = buffer;
    }
    _setInstanceBuffer(buffer) {
        this.instances = buffer;
    }
}
exports.Scene = Scene;
class SceneBuffer {
    constructor(context, selected, canvas) {
        this.scenes = [];
        this.mainCanvas = canvas;
        this.context = context;
        if (selected) {
            this.add(selected);
            this.selected = selected;
        }
        this.initEventListeners();
    }
    initScene() {
        if (this.selected) {
            this.selected._init(this.context);
        }
    }
    setScene(scene) {
        this.selected = scene;
        return this;
    }
    setCanvas(canvas) {
        this.mainCanvas = canvas;
        return this;
    }
    getCanvas() {
        if (this.mainCanvas) {
            return this.mainCanvas;
        }
        else {
            throw new Error("Empty canvas");
        }
    }
    initEventListeners() {
        eventEmitter_1.default.on("beforeRender", () => this.update());
        eventEmitter_1.default.on("preRender", () => this.draw());
    }
    update() {
        var _a;
        if (this.selected) {
            this.selected._update(this.mainCanvas);
            (_a = this.selected) === null || _a === void 0 ? void 0 : _a.update();
        }
    }
    draw() {
        var _a;
        if (this.mainCanvas && this.selected) {
            (_a = this.selected) === null || _a === void 0 ? void 0 : _a.draw(this.mainCanvas);
        }
    }
    add(scene) {
        this.scenes.push(scene);
        scene._setBuffer(this);
        scene._setInstanceBuffer(this.context.instanceBuffer);
        return scene;
    }
    get(name) {
        return this.scenes.find((scene) => scene.name === name) || null;
    }
    destroy(scene) {
        this.scenes = this.scenes.filter((sc) => sc !== scene);
    }
}
exports.SceneBuffer = SceneBuffer;
//# sourceMappingURL=scene.js.map