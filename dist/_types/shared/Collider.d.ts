import { ColliderBuffer } from "../modules/collider";
import { Canvas } from "./Canvas";
import { GameObject } from "./GameObject";
export declare enum eColliderType {
    rectangle = 0,
    circle = 1
}
export interface iColliderOptions {
    offsetX: number;
    offsetY: number;
    width: number;
    height: number;
    radius: number;
    type: eColliderType;
    [key: string]: any;
}
interface iColliderPosition {
    x: number;
    y: number;
}
export declare class Collider implements iColliderOptions {
    [key: string]: any;
    instance: GameObject;
    type: eColliderType;
    collides: Collider[];
    offsetX: number;
    offsetY: number;
    width: number;
    height: number;
    radius: number;
    buffer: ColliderBuffer;
    constructor(buffer: ColliderBuffer, instance: GameObject, opts?: Partial<iColliderOptions>);
    position(): iColliderPosition;
    draw(canvas?: Canvas, style?: string): void;
    destroy(): void;
    isIntersect(another: Collider, self?: Collider): boolean;
    private rectIntersect;
    private circleIntersect;
    private circleRectIntersect;
}
export {};
