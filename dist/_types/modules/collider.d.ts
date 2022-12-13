import { GameObject } from "../shared/GameObject";
import { Collider, iColliderOptions } from "../shared/Collider";
export declare class ColliderBuffer {
    private colliders;
    constructor();
    add(instance: GameObject, opts?: Partial<iColliderOptions>): Collider;
    destroy(s: Collider): void;
    private initEventListeners;
    private update;
}
