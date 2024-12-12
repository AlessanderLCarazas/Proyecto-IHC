import { initializePixiApplication, loadCharacter, moveCharacterTo } from "./shared.js";

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  antialiasing: true,
  transparent: false,
  resolution: 1,
});

app.renderer.backgroundColor = 0xff1234;
document.body.appendChild(app.view);

initializePixiApplication(app);

let lienzoSprites = [];
let characterSprite;

async function loadMap() {
  const texture = await PIXI.Assets.load("./assets/map.jpg");
  const mapSprite = new PIXI.Sprite(texture);

  mapSprite.width = app.screen.width;
  mapSprite.height = app.screen.height;

  mapSprite.interactive = true;
  mapSprite.buttonMode = true;

  app.stage.addChild(mapSprite);

  const lienzoSprite = await loadLienzo();
  lienzoSprites.push(lienzoSprite);

  characterSprite = await loadCharacter();
  const tolerance = 20;

  mapSprite.on("pointerdown", (event) => {
    const position = event.data.global;
    characterSprite = moveCharacterTo(position.x, position.y);
  });

  app.ticker.add(() => {
    const characterBounds = characterSprite.getBounds();
    const lienzoBounds = lienzoSprite.getBounds();
    console.log(characterBounds);
    console.log(lienzoBounds);
    if (Math.abs(characterBounds.x - lienzoBounds.x) < tolerance &&
        Math.abs(characterBounds.y - lienzoBounds.y) < tolerance) {
        window.location.href = "gallery.html";
    }
  });
}

//async function loadCharacter() {}
async function loadLienzo() {
  const lienzoTexture = await PIXI.Assets.load("./assets/lienzo.png");
  const lienzoSprite = new PIXI.Sprite(lienzoTexture);

  lienzoSprite.x = app.screen.width / 1.9;
  lienzoSprite.y = app.screen.height / 3;

  lienzoSprite.anchor.set(0.5, 0.5);
  lienzoSprite.scale.set(0.3, 0.3);

  app.stage.addChild(lienzoSprite);

  return lienzoSprite;
}

loadMap();
