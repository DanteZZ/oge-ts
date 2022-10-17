import app from "../app";
import Player from "./objects/player";

export const initInstances = () => {
  app.instanceBuffer.add(Player);
};

export default app.instanceBuffer;
