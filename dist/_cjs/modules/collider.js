"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColliderBuffer = void 0;
const eventEmitter_1 = require("../utils/eventEmitter");
const Collider_1 = require("../shared/Collider");
class ColliderBuffer {
    constructor() {
        this.colliders = [];
        this.initEventListeners();
    }
    add(instance, opts) {
        const c = new Collider_1.Collider(this, instance, opts);
        this.colliders.push(c);
        return c;
    }
    destroy(s) {
        this.colliders = this.colliders.filter((c) => s !== c);
    }
    initEventListeners() {
        eventEmitter_1.default.on("beforeUpdate", () => this.update());
    }
    update() {
        this.colliders.forEach((s) => {
            s.collides = this.colliders.filter((c) => c !== s && c.isIntersect(s));
        });
    }
}
exports.ColliderBuffer = ColliderBuffer;
//# sourceMappingURL=collider.js.map