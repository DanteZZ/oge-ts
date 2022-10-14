import app from "./app";
import { defaultLayer } from "./project/layers";
import { loadAssets } from "./project/assets";
import "./project/sprites";
import { loadObjects } from "./project/objects";

const initApp = async () => {
  await loadAssets();
  loadObjects();
  app.instanceBuffer.setCanvas(defaultLayer);
  console.log(app);
  app.run();
};

initApp();
