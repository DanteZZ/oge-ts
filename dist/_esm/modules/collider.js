import eventEmitter from "../utils/eventEmitter.js";
import { Collider } from "../shared/Collider.js";
export class ColliderBuffer {
    constructor() {
        this.colliders = [];
        this.initEventListeners();
    }
    add(instance, opts) {
        const c = new Collider(this, instance, opts);
        this.colliders.push(c);
        return c;
    }
    destroy(s) {
        this.colliders = this.colliders.filter((c) => s !== c);
    }
    initEventListeners() {
        eventEmitter.on("beforeUpdate", () => this.update());
    }
    update() {
        this.colliders.forEach((s) => {
            s.collides = this.colliders.filter((c) => c !== s && c.isIntersect(s));
        });
    }
}
//# sourceMappingURL=collider.js.map