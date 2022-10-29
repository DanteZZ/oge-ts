import eventEmitter from "../utils/eventEmitter.js";
export class SpriteInstance {
    constructor(sprite) {
        this.frame = 0;
        this.speed = 1;
        this.frameTime = Date.now();
        this.sprite = sprite;
        this.initEventListeners();
    }
    initEventListeners() {
        eventEmitter.on("afterRender", () => this.updateFrame());
    }
    updateFrame() {
        const info = this.sprite.getInfo();
        if (info.frames > 1) {
            if (this.speed > 0 && info.speed > 0) {
                if (Date.now() >=
                    this.frameTime + 1000 * (info.speed / info.frames) * this.speed) {
                    this.frameTime = Date.now();
                    if (this.frame == info.frames - 1) {
                        this.frame = 0;
                    }
                    else {
                        this.frame++;
                    }
                }
            }
        }
    }
    draw(canvas, x, y, width, height, rotation, opacity, filter) {
        this.sprite.draw(canvas, x, y, this.frame, rotation, opacity, filter, width, height);
    }
}
//# sourceMappingURL=SpriteInstance.js.map