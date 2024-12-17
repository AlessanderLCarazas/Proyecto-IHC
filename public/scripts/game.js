import { initializePixiApplication, loadCharacter, moveCharacterTo, loadSomething } from "./shared.js";

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
let moreSprites = [];

async function loadMap() {
  const texture = await PIXI.Assets.load("./assets/mapsouthamerica.jpg");
  const mapSprite = new PIXI.Sprite(texture);

  mapSprite.width = app.screen.width;
  mapSprite.height = app.screen.height;

  mapSprite.interactive = true;
  mapSprite.buttonMode = true;

  //Variables de Objetos y TOlerancia
  const tolerance = 30;

  app.stage.addChild(mapSprite);
  for (let i = 0; i < 10; i++) {
    // Generar posiciones aleatorias dentro de los rangos dados
    const randomX = Math.random() * (1000 - 725) + 725; // Rango de 725 a 1000
    const randomY = Math.random() * (700 - 300) + 300; // Rango de 300 a 700
  
    const lienzoSprite = await loadSomething("./assets/caballete.png", randomX, randomY, 0.1, 0.1);
    lienzoSprites.push(lienzoSprite);
  }
  

  const lienzoSprite = await loadLienzo();
  lienzoSprites.push(lienzoSprite);

  characterSprite = await loadCharacter(100, 100, 0.4, 0.4);

  mapSprite.on("pointerdown", (event) => {
    const position = event.data.global;
    characterSprite = moveCharacterTo(position.x, position.y);
  });

  app.ticker.add(() => {
    const characterBounds = characterSprite.getBounds();

    lienzoSprites.forEach((lienzoSprite, index) => {
      const lienzoBounds = lienzoSprite.getBounds();
      if (
        Math.abs(characterBounds.x - lienzoBounds.x) < tolerance &&
        Math.abs(characterBounds.y - lienzoBounds.y) < tolerance
      ) {
        window.location.href = `gallery.html?lienzo=${index}`;
      }
    });
    

    const lienzoBounds = lienzoSprites[0].getBounds();
    console.log(characterBounds);
    console.log(lienzoBounds);
    if (Math.abs(characterBounds.x - lienzoBounds.x) < tolerance &&
        Math.abs(characterBounds.y - lienzoBounds.y) < tolerance) {
        window.location.href = "gallery.html";
    }
  });
}

async function loadLienzo() {
  const lienzoTexture = await PIXI.Assets.load("./assets/caballete.png");
  const lienzoSprite = new PIXI.Sprite(lienzoTexture);

  lienzoSprite.x = app.screen.width / 1.9;
  lienzoSprite.y = app.screen.height / 3;

  lienzoSprite.anchor.set(0.5, 0.5);
  lienzoSprite.scale.set(0.3, 0.3);

  app.stage.addChild(lienzoSprite);

  return lienzoSprite;
}

loadMap();
