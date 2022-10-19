import { GameObject } from "../../../../src";
declare class PlayerObject extends GameObject {
    sprite: import("../../../../src").SpriteInstance;
    constructor();
    update(): void;
}
declare const Player: PlayerObject;
export default Player;
