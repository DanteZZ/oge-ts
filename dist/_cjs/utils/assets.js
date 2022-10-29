"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetPattern = exports.Assets = exports.Asset = void 0;
const resourceLoader_1 = require("./resourceLoader");
class Asset {
    constructor(url, name = null) {
        resourceLoader_1.default.addToLoad(url);
        this.url = url;
        this.name = name;
    }
    getResource() {
        return resourceLoader_1.default.get(this.url);
    }
}
exports.Asset = Asset;
class Assets {
    constructor() {
        this.assets = [];
    }
    create(url, name = null) {
        const asset = new Asset(url, name);
        this.assets.push(asset);
        return asset;
    }
    createAssets(assets) {
        const result = [];
        assets.forEach((asset) => result.push(this.create(asset.url, asset.name)));
        return result;
    }
    get(name) {
        return this.assets.find((asset) => asset.name === name) || null;
    }
    getByUrl(url) {
        return this.assets.find((asset) => asset.url === url) || null;
    }
    loadAssets() {
        return new Promise((res, rej) => {
            resourceLoader_1.default.onReady(res);
            resourceLoader_1.default.loadResources();
        });
    }
}
exports.Assets = Assets;
class AssetPattern {
    constructor(canvas, asset, type = "repeat") {
        this.pattern = null;
        this.type = "repeat";
        this.canvas = canvas;
        this.asset = asset;
        this.type = type;
    }
    getPattern() {
        const res = this.asset.getResource();
        if (res instanceof HTMLImageElement) {
            if (!this.pattern) {
                this.pattern = this.canvas.ctx.createPattern(res, this.type);
            }
            if (this.pattern) {
                return this.pattern;
            }
            else {
                throw new Error("Pattern is not created");
            }
        }
        else {
            throw new Error("Asset is not loaded");
        }
    }
}
exports.AssetPattern = AssetPattern;
//# sourceMappingURL=assets.js.map