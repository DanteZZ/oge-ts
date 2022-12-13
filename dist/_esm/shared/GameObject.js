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
    create() { }
    update() { }
    draw(canvas) {
        this.defaultDraw(canvas);
    }
    defaultDraw(canvas) {
        if (canvas && this.sprite instanceof SpriteInstance) {
            this.sprite.draw(canvas, this.x, this.y);
        }
    }
    destroy() {
        var _a, _b;
        (_a = this === null || this === void 0 ? void 0 : this.collider) === null || _a === void 0 ? void 0 : _a.destroy();
        (_b = this === null || this === void 0 ? void 0 : this.buffer) === null || _b === void 0 ? void 0 : _b.destroy(this);
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
    createCollider(opts) {
        var _a, _b;
        this.collider = (_b = (_a = this.buffer) === null || _a === void 0 ? void 0 : _a.app) === null || _b === void 0 ? void 0 : _b.colliderBuffer.add(this, opts);
    }
    isCollide(obj, returnObjects = false) {
        let collisions = [];
        if (this.collider) {
            collisions = this.collider.collides.filter((c) => {
                var _a;
                return obj instanceof GameObject
                    ? c === obj.collider
                    : ((_a = c.instance) === null || _a === void 0 ? void 0 : _a.name) === obj;
            });
        }
        return returnObjects ? collisions : !!collisions.length;
    }
    _setName(name) {
        this.name = name;
    }
    _setBuffer(buffer) {
        this.buffer = buffer;
    }
}
//# sourceMappingURL=GameObject.js.map