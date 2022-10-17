import app from "./app";
import "./project/sprites";

import { defaultLayer } from "./project/layers";
import { loadAssets } from "./project/assets";
import { loadScenes } from "./project/scenes";
import DefaultScene from "./project/scenes/default";

const initApp = async () => {
  await loadAssets();
  loadScenes();

  app.instanceBuffer.setCanvas(defaultLayer);
  app.sceneBuffer.setCanvas(defaultLayer).setScene(DefaultScene).initScene();

  app.run();

  console.log(app);
};

initApp();
