const app = new OGE(document.getElementById("app"));
const runApp = async () => {
  const wall = app.assets.create("./wall.jpeg", "wall");
  await app.assets.loadAssets();
  app.graphic.createCanvas("default", 600, 400);
  app.events.on("render", () =>
    app.graphic.drawImage({
      canvas: "default",
      image: wall.getResource(),
      x: 0,
      y: 0,
      dWidth: 600,
      dHeight: 400,
      sWidth: 600,
      sHeight: 400,
      offsetX: 0,
      offsetY: 0,
    })
  );
};

runApp();
