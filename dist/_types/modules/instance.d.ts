import { Canvas } from "../shared/Canvas";
import { GameObject } from "../shared/GameObject";
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
    addInstances(instances: GameObject[]): GameObject[];
    get(name: string): GameObject | null;
    destroy(instance: GameObject): void;
    destroyAll(): void;
}
