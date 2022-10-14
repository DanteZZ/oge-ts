// Инициируем проект
const app = new OGE(document.getElementById("app"));

const runApp = async () => {
  // Описываем список Ассетов и грузим
  const assetList = [
    { name: "wall", url: "./wall.jpeg" },
    { name: "example", url: "./sprite_example.png" },
  ];
  app.assets.createAssets(assetList);
  await app.assets.loadAssets();

  // Создаём спрайты и генерируем им Instance (Чтобы можно было анимировать их по разному)
  const sWall = app.sprites
    .create(app.assets.get("wall"), "sWall")
    .createInstance();
  const sExample = app.sprites
    .create(app.assets.get("example"), "sExample", 4, 0, 0, 0, 0, 0.5)
    .createInstance();

  // Запускаем игру
  app.run();
};

runApp();
