import eventEmitter from "../utils/eventEmitter";
import { GameObject } from "../shared/GameObject";
import { Collider, iColliderOptions } from "../shared/Collider";

export class ColliderBuffer {
  private colliders: Collider[];

  constructor() {
    this.colliders = [];
    this.initEventListeners();
  }

  public add(instance: GameObject, opts?: Partial<iColliderOptions>): Collider {
    const c = new Collider(this, instance, opts);
    this.colliders.push(c);
    return c;
  }

  public destroy(s: Collider) {
    this.colliders = this.colliders.filter((c) => s !== c);
  }

  private initEventListeners() {
    eventEmitter.on("beforeUpdate", () => this.update());
  }

  private update(): void {
    this.colliders.forEach((s) => {
      s.collides = this.colliders.filter((c) => c !== s && c.isIntersect(s));
    });
  }
}
