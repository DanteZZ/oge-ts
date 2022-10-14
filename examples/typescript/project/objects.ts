import app from "../app";
import Player from "./objects/player";

export const loadObjects = () => {
  app.instanceBuffer.add(Player);
};

export default app.instanceBuffer;
