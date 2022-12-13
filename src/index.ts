import OGE from "./oge";

// Shared
import { GameObject } from "./shared/GameObject";
import { Canvas } from "./shared/Canvas";
import { SpriteInstance } from "./shared/SpriteInstance";
import { Collider, eColliderType } from "./shared/Collider";

// Modules
import Input from "./utils/input";
import { Camera } from "./modules/camera";
import { Scene } from "./modules/scene";
import { Sprite } from "./modules/sprite";
import { Asset, AssetPattern } from "./utils/assets";

export {
  // Shared
  GameObject,
  Canvas,
  SpriteInstance,
  Collider,

  // Modules
  Input,
  Camera,
  Scene,
  Sprite,
  Asset,
  AssetPattern,

  // Helpers
  eColliderType,
};

export default OGE;
