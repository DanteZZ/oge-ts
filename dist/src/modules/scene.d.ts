import OGE from "..";
import { Canvas } from "../shared/Canvas";
import { Camera } from "./camera";
import { InstanceBuffer } from "./instance";
export declare abstract class Scene {
    name: string | null;
    width: number;
    height: number;
    instances: InstanceBuffer;
    private buffer?;
    private camera?;
    _init(context: OGE): void;
    _update(canvas?: Canvas): void;
    init(): void;
    update(): void;
    draw(canvas: Canvas): void;
    setCamera(camera: Camera): void;
    destroy(): void;
    getBuffer(): SceneBuffer;
    getCanvas(): Canvas;
    getInstanceBuffer(): InstanceBuffer;
    _setName(name: string): void;
    _setBuffer(buffer: SceneBuffer): void;
    _setInstanceBuffer(buffer: InstanceBuffer): void;
}
export declare class SceneBuffer {
    private scenes;
    private selected?;
    private mainCanvas?;
    private context;
    constructor(context: OGE, selected?: Scene, canvas?: Canvas);
    initScene(): void;
    setScene(scene: Scene): SceneBuffer;
    setCanvas(canvas: Canvas): SceneBuffer;
    getCanvas(): Canvas;
    private initEventListeners;
    private update;
    private draw;
    add(scene: Scene): Scene;
    get(name: string): Scene | null;
    destroy(scene: Scene): void;
}
