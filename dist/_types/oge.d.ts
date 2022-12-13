import { EventEmitter } from "./utils/eventEmitter";
import Graphic from "./utils/graphic";
import { InputBuffer } from "./utils/input";
import { Assets } from "./utils/assets";
import { Sprites } from "./modules/sprite";
import { InstanceBuffer } from "./modules/instance";
import { SceneBuffer } from "./modules/scene";
import { ColliderBuffer } from "./modules/collider";
export default class OGE {
    [key: string]: any;
    events: EventEmitter;
    graphic: Graphic;
    assets: Assets;
    sprites: Sprites;
    instanceBuffer: InstanceBuffer;
    colliderBuffer: ColliderBuffer;
    sceneBuffer: SceneBuffer;
    input: InputBuffer;
    fps: number;
    deltaTime: number;
    lastDeltaTime: number;
    constructor(element: HTMLElement | null);
    private initEventListeners;
    private calculateDelta;
    run(): void;
}
