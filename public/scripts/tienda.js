import { initializePixiApplication, loadSomething } from "./shared.js";

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
let flechaSprite; // Agregar la flecha como sprite

// Cargar el lienzo de la tienda de arte
async function loadTienda() {
  const texture = await PIXI.Assets.load("./assets/TIENDADEARTEcanvas3.png");
  const sprite = new PIXI.Sprite(texture);

  sprite.width = app.screen.width; // Ajustar el ancho al de la pantalla
  sprite.height = app.screen.height; // Ajustar el alto al de la pantalla

  app.stage.addChild(sprite); // Añadir el lienzo de fondo al escenario

  // Cargar los tres dibujos con sus posiciones fijas y tamaños ajustados
  dibujo1Sprite = await loadSomething("./assets/DIBUJO1.png", 200, 300, 0.3, 0.3);
  dibujo2Sprite = await loadSomething("./assets/DIBUJO2.png", 1600, 300, 0.3, 0.3);
  dibujo3Sprite = await loadSomething("./assets/DIBUJO3.png", 500, 800, 0.3, 0.3);

  // Hacer que los dibujos sean interactivos y añadir funcionalidad al hacer clic
  dibujo1Sprite.interactive = true; // Hacer interactivo
  dibujo1Sprite.buttonMode = true; // Mostrar el cursor como un botón
  dibujo1Sprite.on("pointerdown", () => {
    window.location.href = "cuadroo.html?id=cuadroo1"; // Redirigir a la página de detalles del DIBUJO1
  });
  app.stage.addChild(dibujo1Sprite); // Añadir al escenario

  dibujo2Sprite.interactive = true; // Hacer interactivo
  dibujo2Sprite.buttonMode = true; // Mostrar el cursor como un botón
  dibujo2Sprite.on("pointerdown", () => {
    window.location.href = "cuadroo.html?id=cuadroo2"; // Redirigir a la página de detalles del DIBUJO2
  });
  app.stage.addChild(dibujo2Sprite); // Añadir al escenario

  dibujo3Sprite.interactive = true; // Hacer interactivo
  dibujo3Sprite.buttonMode = true; // Mostrar el cursor como un botón
  dibujo3Sprite.on("pointerdown", () => {
    window.location.href = "cuadroo.html?id=cuadroo3"; // Redirigir a la página de detalles del DIBUJO3
  });
  app.stage.addChild(dibujo3Sprite); // Añadir al escenario

  // Cargar la flecha y añadirla a la esquina superior izquierda
  const flechaTexture = await PIXI.Assets.load("./assets/flecha.png");
  flechaSprite = new PIXI.Sprite(flechaTexture);

  flechaSprite.x = 5; // Posicionar la flecha en la esquina superior izquierda
  flechaSprite.y = 5;

  // Reducir el tamaño de la flecha al 30% de su tamaño original (70% más pequeña)
  flechaSprite.scale.set(0.2);

  flechaSprite.interactive = true; // Hacer la flecha interactiva
  flechaSprite.buttonMode = true; // Mostrar el cursor como un botón
  flechaSprite.on("pointerdown", () => {
    window.history.back(); // Retroceder a la página anterior
  });

  app.stage.addChild(flechaSprite); // Añadir la flecha al escenario
}

// Inicializar la tienda
loadTienda();
