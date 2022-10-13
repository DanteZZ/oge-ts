// Инициируем проект
const app = new OGE(document.getElementById("app"));
const layer = app.graphic.createCanvas("default", 600, 400);

const runApp = async () => {
  // Описываем список Ассетов и грузим
  const assetList = [
    { name: "wall", url: "./wall.jpeg" },
    { name: "example", url: "./sprite_example.png" },
  ];
  app.assets.createAssets(assetList);
  await app.assets.loadAssets();

  // Создаём спрайты и генерируем им Instance (Чтобы можно было анимировать их по разному)
  sWall = app.sprites.create(app.assets.get("wall"), "sWall").createInstance();
  sExample = app.sprites
    .create(app.assets.get("example"), "sExample", 4, 0, 0, 0, 0, 0.5)
    .createInstance();

  // Отлавливаем момент отрисовки, и рисуем
  app.events.on("render", () => {
    sWall.draw(
      layer,
      128,
      128,
      128,
      128,
      45,
      0.8,
      "contrast(1.4) sepia(1) drop-shadow(-9px 18px 3px #e81)"
    );
    sExample.draw(layer, 0, 0);
  });

  // Запускаем игру
  app.run();
};

runApp();
