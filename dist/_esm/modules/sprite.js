import { SpriteInstance } from "../shared/SpriteInstance.js";
export class Sprite {
    constructor(asset, name = null, opts) {
        this.name = null;
        this.width = 0;
        this.height = 0;
        this.frames = 1;
        this.centerX = 0;
        this.centerY = 0;
        this.speed = 1;
        this.asset = asset;
        this.name = name;
        opts &&
            Object.entries(opts).forEach(([key, value]) => {
                this[key] = value;
            });
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
    draw(canvas, x, y, opts) {
        const inf = this.getInfo();
        canvas.drawAsset({
            asset: this.asset,
            x: x - this.centerX,
            y: y - this.centerY,
            dWidth: (opts === null || opts === void 0 ? void 0 : opts.width) || inf.width,
            dHeight: (opts === null || opts === void 0 ? void 0 : opts.height) || inf.height,
            sWidth: inf.width,
            sHeight: inf.height,
            offsetX: ((opts === null || opts === void 0 ? void 0 : opts.frame) || 0) * inf.width,
            offsetY: 0,
            rotation: opts === null || opts === void 0 ? void 0 : opts.rotation,
            filter: opts === null || opts === void 0 ? void 0 : opts.filter,
            opacity: opts === null || opts === void 0 ? void 0 : opts.opacity,
        });
    }
}
export class Sprites {
    constructor() {
        this.sprites = [];
    }
    create(asset, name = null, opts) {
        const sprite = new Sprite(asset, name, opts);
        this.sprites.push(sprite);
        return sprite;
    }
    get(name) {
        return this.sprites.find((sprite) => sprite.name === name) || null;
    }
}
//# sourceMappingURL=sprite.js.map