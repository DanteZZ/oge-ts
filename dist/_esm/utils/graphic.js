import { Canvas } from "../shared/Canvas.js";
import eventEmitter from "./eventEmitter.js";
export default class Graphic {
    constructor(rootElement) {
        this.canvasList = [];
        this.isRender = false;
        this.rootElement = rootElement;
    }
    updateFrame() {
        if (this.isRender) {
            this.clear();
            eventEmitter.emit("beforeRender");
            eventEmitter.emit("preRender");
            eventEmitter.emit("render");
            eventEmitter.emit("postRender");
            eventEmitter.emit("afterRender");
            this.restore();
            window.requestAnimationFrame(() => {
                this.updateFrame();
            });
        }
    }
    stopRender() {
        this.isRender = false;
    }
    playRender() {
        this.isRender = true;
        this.updateFrame();
    }
    getCanvas(name) {
        var _a;
        return ((_a = this.canvasList) === null || _a === void 0 ? void 0 : _a.find((item) => item.name === name)) || null;
    }
    createCanvas(name, width = 0, height = 0) {
        if (!this.getCanvas(name)) {
            const canvas = new Canvas(this.rootElement, name, width, height);
            this.canvasList.push(canvas);
            return canvas;
        }
        else {
            throw new Error(`Canvas "${name}" already exist`);
        }
    }
    clear() {
        this.canvasList.forEach((canvas) => { var _a; return (_a = canvas.ctx) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, canvas.element.width, canvas.element.height); });
    }
    restore() {
        this.canvasList.forEach((canvas) => { var _a; return (_a = canvas.ctx) === null || _a === void 0 ? void 0 : _a.restore(); });
    }
    setSize(name, width, height) {
        const canvas = typeof name === "string" ? this.getCanvas(name) : name;
        if (canvas) {
            canvas.setSize(width, height);
            return true;
        }
        else {
            return false;
        }
    }
    setAllSizes(width, height) {
        this.canvasList.forEach((canvas) => this.setSize(canvas, width, height));
    }
    setOffset(name, x, y) {
        const canvas = this.getCanvas(name);
        if (canvas) {
            canvas.setOffset(x, y);
            return true;
        }
        else {
            return false;
        }
    }
    destroyCanvas(name) {
        const canvas = typeof name === "string" ? this.getCanvas(name) : name;
        if (canvas) {
            canvas.element.remove();
            this.canvasList = this.canvasList.filter((canvas) => canvas.name !== name);
        }
    }
    destroyAll() {
        this.canvasList.forEach((canvas) => this.destroyCanvas(canvas));
    }
    drawAsset(info) {
        if (info.canvas) {
            let canvas = info.canvas instanceof Canvas
                ? info.canvas
                : this.getCanvas(info.canvas);
            canvas === null || canvas === void 0 ? void 0 : canvas.drawAsset(info);
        }
    }
}
//# sourceMappingURL=graphic.js.map