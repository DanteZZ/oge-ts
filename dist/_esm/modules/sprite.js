import { SpriteInstance } from "../shared/SpriteInstance.js";
export class Sprite {
    constructor(asset, name = null, frames = 1, centerX = 0, centerY = 0, width = 0, height = 0, speed = 1) {
        this.name = null;
        this.width = 0;
        this.height = 0;
        this.frames = 1;
        this.centerX = 0;
        this.centerY = 0;
        this.speed = 1;
        this.asset = asset;
        this.speed = speed;
        this.name = name;
        this.width = width;
        this.height = height;
        this.frames = frames;
        this.centerX = centerX;
        this.centerY = centerY;
    }
    createInstance() {
        return new SpriteInstance(this);
    }
    setAsset(asset) {
        this.asset = asset;
    }
    setSize(width, height) {
        this.width = width;
        this.height = height;
    }
    setCenter(centerX, centerY) {
        this.centerX = centerX;
        this.centerY = centerY;
    }
    setFrames(frames) {
        this.frames = frames;
    }
    getSize() {
        const res = this.asset.getResource();
        if (res instanceof HTMLImageElement) {
            let width = this.width || res.width;
            let height = this.height || res.height;
            if (this.frames > 1) {
                width = Math.ceil(width / this.frames);
            }
            return { width, height };
        }
        else {
            throw new Error("Undefined asset");
        }
    }
    getInfo() {
        const size = this.getSize();
        return Object.assign({ speed: this.speed, frames: this.frames, centerX: this.centerX, centerY: this.centerY }, size);
    }
    draw(canvas, x, y, frame = null, rotation, opacity, filter, width, height) {
        const inf = this.getInfo();
        canvas.drawAsset({
            asset: this.asset,
            x,
            y,
            dWidth: width || inf.width,
            dHeight: height || inf.height,
            sWidth: inf.width,
            sHeight: inf.height,
            offsetX: (frame || 0) * inf.width,
            offsetY: 0,
            rotation: rotation,
            filter: filter,
            opacity: opacity,
        });
    }
}
export class Sprites {
    constructor() {
        this.sprites = [];
    }
    create(asset, name = null, frames = 1, centerX = 0, centerY = 0, width = 0, height = 0, speed = 1) {
        const sprite = new Sprite(asset, name, frames, centerX, centerY, width, height, speed);
        this.sprites.push(sprite);
        return sprite;
    }
    get(name) {
        return this.sprites.find((sprite) => sprite.name === name) || null;
    }
}
//# sourceMappingURL=sprite.js.map