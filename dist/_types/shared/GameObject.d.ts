import { SpriteInstance } from "../shared/SpriteInstance";
import { Canvas } from "./Canvas";
import { InstanceBuffer } from "../modules/instance";
import { Collider, iColliderOptions } from "./Collider";
interface iGameObjectParams {
    [key: string]: any;
    name?: string | null;
    x?: number;
    y?: number;
    depth?: number;
    collider?: Collider;
}
export declare abstract class GameObject implements iGameObjectParams {
    [key: string]: any;
    name: string | null;
    x: number;
    y: number;
    depth: number;
    sprite: SpriteInstance | null;
    private buffer?;
    collider?: Collider;
    constructor(another?: iGameObjectParams);
    create(): void;
    update(): void;
    draw(canvas?: Canvas): void;
    defaultDraw(canvas?: Canvas): void;
    destroy(): void;
    onDestroy(): void;
    getBuffer(): InstanceBuffer;
    createCollider(opts: Partial<iColliderOptions>): void;
    isCollide(obj: GameObject | string, returnObjects?: false): boolean;
    isCollide(obj: GameObject | string, returnObjects?: true): Collider[];
    _setName(name: string): void;
    _setBuffer(buffer: InstanceBuffer): void;
}
export {};
