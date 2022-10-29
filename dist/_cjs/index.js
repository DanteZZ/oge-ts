"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetPattern = exports.Asset = exports.Sprite = exports.Scene = exports.Camera = exports.Input = exports.SpriteInstance = exports.Canvas = exports.GameObject = void 0;
const oge_1 = require("./oge");
// Shared
const GameObject_1 = require("./shared/GameObject");
Object.defineProperty(exports, "GameObject", { enumerable: true, get: function () { return GameObject_1.GameObject; } });
const Canvas_1 = require("./shared/Canvas");
Object.defineProperty(exports, "Canvas", { enumerable: true, get: function () { return Canvas_1.Canvas; } });
const SpriteInstance_1 = require("./shared/SpriteInstance");
Object.defineProperty(exports, "SpriteInstance", { enumerable: true, get: function () { return SpriteInstance_1.SpriteInstance; } });
// Modules
const input_1 = require("./utils/input");
exports.Input = input_1.default;
const camera_1 = require("./modules/camera");
Object.defineProperty(exports, "Camera", { enumerable: true, get: function () { return camera_1.Camera; } });
const scene_1 = require("./modules/scene");
Object.defineProperty(exports, "Scene", { enumerable: true, get: function () { return scene_1.Scene; } });
const sprite_1 = require("./modules/sprite");
Object.defineProperty(exports, "Sprite", { enumerable: true, get: function () { return sprite_1.Sprite; } });
const assets_1 = require("./utils/assets");
Object.defineProperty(exports, "Asset", { enumerable: true, get: function () { return assets_1.Asset; } });
Object.defineProperty(exports, "AssetPattern", { enumerable: true, get: function () { return assets_1.AssetPattern; } });
exports.default = oge_1.default;
//# sourceMappingURL=index.js.map