import { SpriteInstance } from "../shared/SpriteInstance";
import { Canvas } from "./Canvas";
import { InstanceBuffer } from "../modules/instance";
interface iGameObjectParams {
    [key: string]: any;
    name?: string | null;
    x?: number;
    y?: number;
    depth?: number;
}
export declare abstract class GameObject implements iGameObjectParams {
    [key: string]: any;
    name: string | null;
    x: number;
    y: number;
    depth: number;
    sprite: SpriteInstance | null;
    private buffer?;
    constructor(another?: iGameObjectParams);
    update(): void;
    draw(canvas?: Canvas): void;
    destroy(): void;
    onDestroy(): void;
    getBuffer(): InstanceBuffer;
    _setName(name: string): void;
    _setBuffer(buffer: InstanceBuffer): void;
}
export {};
