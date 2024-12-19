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
  const texture = await PIXI.Assets.load("./assets/VISTACUADRO.jpg");
  const mapSprite = new PIXI.Sprite(texture);

  mapSprite.width = app.screen.width;
  mapSprite.height = app.screen.height;

  mapSprite.interactive = true;
  mapSprite.buttonMode = true;

  //Variables de Objetos y TOlerancia
  const tolerance = 30;

  characterSprite = await loadCharacter(1200, 320, 1, 1);

  mapSprite.on("pointerdown", (event) => {
    const position = event.data.global;
    characterSprite = moveCharacterTo(position.x, position.y);
  });
}


loadMap();

const params = new URLSearchParams(window.location.search);
const imageUrl = params.get('image');

if (imageUrl) {
    const displayImage = document.getElementById('display-image');
    displayImage.src = imageUrl;
  }