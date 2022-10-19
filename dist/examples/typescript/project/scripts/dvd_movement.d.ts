import { GameObject } from "../../../../src/modules/gameObject";
declare enum dirs {
    RIGHT = 0,
    LEFT = 1,
    TOP = 2,
    DOWN = 3
}
export default class DVDMovement {
    directionH: dirs;
    directionV: dirs;
    speed: number;
    obj: GameObject;
    constructor(obj: GameObject, speed?: number);
    updateMovement(): void;
}
export {};
