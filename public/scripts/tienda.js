import { initializePixiApplication, loadCharacter, moveCharacterTo, loadSomething, moveCarrete} from "./shared.js";
// Crear una aplicación PIXI
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  antialiasing: true,
  transparent: false,
  resolution: 1,
});

// Establecer el color de fondo para la aplicación
app.renderer.backgroundColor = 0x1234ff;
document.body.appendChild(app.view);
initializePixiApplication(app); // Inicializa la aplicación de PixiJS

let dibujo1Sprite;
let dibujo2Sprite;
let dibujo3Sprite;
let characterSprite;

// Cargar el lienzo de la tienda de arte
async function loadTienda() {
  const texture = await PIXI.Assets.load("./assets/TIENDADEARTEcanvas3.png");
  const sprite = new PIXI.Sprite(texture);

  sprite.width = app.screen.width;  // Ajustar el ancho al de la pantalla
  sprite.height = app.screen.height;  // Ajustar el alto al de la pantalla

  app.stage.addChild(sprite); // Añadir el lienzo de fondo al escenario

  // Cargar los tres dibujos y ubicarlos en la parte inferior con margen
  dibujo1Sprite = await loadSomething("./assets/DIBUJO1.png", 200, 300, 0.3, 0.3);

  dibujo2Sprite = await loadSomething("./assets/DIBUJO2.png", 1600, 300, 0.3, 0.3);

  dibujo3Sprite = await loadSomething("./assets/DIBUJO3.png", 500, 800, 0.3, 0.3);

  // Añadir los tres dibujos al escenario
}

// Inicializar la tienda
loadTienda();
