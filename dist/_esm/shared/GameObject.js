import { SpriteInstance } from "./SpriteInstance.js";
export class GameObject {
    constructor(another = {}) {
        this.name = null;
        this.x = 0;
        this.y = 0;
        this.depth = 0;
        this.sprite = null;
        Object.entries(another).forEach(([key, val]) => {
            this[key] = val;
        });
    }
    update() { }
    draw(canvas) {
        if (canvas && this.sprite instanceof SpriteInstance) {
            this.sprite.draw(canvas, this.x, this.y);
        }
    }
    destroy() {
        var _a;
        (_a = this === null || this === void 0 ? void 0 : this.buffer) === null || _a === void 0 ? void 0 : _a.destroy(this);
    }
    onDestroy() { }
    getBuffer() {
        if (this.buffer) {
            return this.buffer;
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
}
//# sourceMappingURL=GameObject.js.map