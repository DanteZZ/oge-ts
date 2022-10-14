import app from "../app";

import wallSrc from "../assets/wall.jpeg";
import exampleSrc from "../assets/sprite_example.png";

export const aWall = app.assets.create(wallSrc, "wall");
export const aExample = app.assets.create(exampleSrc, "example");

export const loadAssets = () => app.assets.loadAssets();
