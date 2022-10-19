import { Canvas } from "../shared/canvas";
import { SpriteInstance } from "./sprite";
export declare abstract class GameObject {
    name: string | null;
    x: number;
    y: number;
    sprite: SpriteInstance | null;
    private buffer?;
    update(): void;
    draw(canvas?: Canvas): void;
    destroy(): void;
    onDestroy(): void;
    getBuffer(): InstanceBuffer;
    _setName(name: string): void;
    _setBuffer(buffer: InstanceBuffer): void;
}
export declare class InstanceBuffer {
    private instances;
    private canvas?;
    constructor(canvas?: Canvas);
    setCanvas(canvas: Canvas): void;
    getCanvas(): Canvas;
    private initEventListeners;
    private update;
    private draw;
    add(instance: GameObject): GameObject;
    get(name: string): GameObject | null;
    destroy(instance: GameObject): void;
    destroyAll(): void;
}
