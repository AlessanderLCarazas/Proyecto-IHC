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
let isInTaberna = false;

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

  const beerMugSprites = await loadBeerMugs();

  characterSprite = await loadCharacter();
  const tolerance = 6;

  mapSprite.on("pointerdown", (event) => {
    const position = event.data.global;
    characterSprite = moveCharacterTo(position.x, position.y);
  });

  app.ticker.add(() => {
    const characterBounds = characterSprite.getBounds();
    const lienzoBounds = lienzoSprite.getBounds();
    console.log(characterBounds);
    console.log(lienzoBounds);
    if (
      Math.abs(characterBounds.x - lienzoBounds.x) < tolerance &&
      Math.abs(characterBounds.y - lienzoBounds.y) < tolerance
    ) {
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

//cargar los tarros de cerveza
async function loadBeerMugs() {
  const beerLocations = [
    { x: app.screen.width * 0.46, y: app.screen.height * 0.4, link: "beer1.html" },
    { x: app.screen.width * 0.59, y: app.screen.height * 0.22, link: "beer2.html" },
    { x: app.screen.width * 0.63, y: app.screen.height * 0.5, link: "beer3.html" },
    { x: app.screen.width * 0.57, y: app.screen.height * 0.64, link: "beer4.html" },
    { x: app.screen.width * 0.69, y: app.screen.height * 0.82, link: "beer5.html" },
  ];

  const beerSprites = [];

  for (const location of beerLocations) {
    const beerSprite = await addBeerMug(location.x, location.y, location.link);
    beerSprites.push(beerSprite);
  }

  return beerSprites;
}

// Función auxiliar tarro individual
async function addBeerMug(x, y, link) {
  const beerTexture = await PIXI.Assets.load("./assets/beer-mug.png");
  const beerSprite = new PIXI.Sprite(beerTexture);

  beerSprite.x = x;
  beerSprite.y = y;
  beerSprite.anchor.set(0.5, 0.5);
  beerSprite.scale.set(0.23, 0.23);

  beerSprite.interactive = true;
  beerSprite.buttonMode = true;

  beerSprite.cursor = "pointer";

  beerSprite.on("pointerdown", () => {
    moveCharacterTo(x, y); // Mueve el personaje hacia el tarro seleccionado
    let modalShown = false; // Bandera para asegurar que el modal se muestra solo una vez
  
    app.ticker.add(function checkArrival() {
        const characterBounds = characterSprite.getBounds();
        const beerBounds = beerSprite.getBounds();
        const tolerance = 10; // Aumentar la tolerancia
  
        if (
            Math.abs(characterBounds.x - beerBounds.x) < tolerance &&
            Math.abs(characterBounds.y - beerBounds.y) < tolerance &&
            !modalShown
        ) {
            modalShown = true;
            app.ticker.remove(checkArrival);
  
            characterSprite.x = beerSprite.x;
            characterSprite.y = beerSprite.y;
  
            // Mostrar el modal
            const modal = document.getElementById("modal");
            modal.style.display = "flex";
  
            // Configuración de los botones del modal
            document.getElementById("accept-button").onclick = () => {
                window.location.href = "taberna.html"; // Redirige a la página de la taberna
            };
  
            document.getElementById("decline-button").onclick = () => {
                modal.style.display = "none"; // Cierra el modal
            };
        }
    });
});

  
  app.stage.addChild(beerSprite);

  return beerSprite;
}

loadMap();
