import { Canvas } from "../shared/Canvas";
import { Scene } from "./scene";
import { GameObject } from "../shared/GameObject";
export declare class Camera {
    name: string | null;
    width: number;
    height: number;
    x: number;
    y: number;
    trackInstance?: GameObject;
    private scene;
    offset?: number;
    constructor(scene: Scene, trackInstance?: GameObject);
    update(canvas: Canvas): void;
    setName(name: string): void;
    setScene(scene: Scene): void;
    setTrackInstance(trackInstance: GameObject): void;
}
