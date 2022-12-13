import { Canvas } from "../shared/Canvas";
import { GameObject } from "../shared/GameObject";
import OGE from "../oge";
export declare class InstanceBuffer {
    instances: GameObject[];
    private canvas?;
    app?: OGE;
    constructor(app?: OGE, canvas?: Canvas);
    setCanvas(canvas: Canvas): void;
    getCanvas(): Canvas;
    private initEventListeners;
    private update;
    private draw;
    add(instance: GameObject): GameObject;
    addInstances(instances: GameObject[]): GameObject[];
    get(name: string): GameObject | null;
    getAll(name: string): GameObject[] | null;
    destroy(instance: GameObject): void;
    destroyAll(): void;
}
