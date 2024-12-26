import { initializePixiApplication, loadCharacter, moveCharacterTo, loadSomething, moveCarrete, setupKeyControls} from "./shared.js";

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

//BEERS USING
let beerSprites = [];

//SPRITES USING
let characterSprite;
let carreteSprite; // Sprite de la carreta

//SOME DIFFERENT VARIABLES

const tolerance = 30;
let lastCarreteMoveTime = 0;
const moveInterval = 15000;


async function loadMap() {
  const texture = await PIXI.Assets.load("./assets/mapsouthamerica.jpg");
  const mapSprite = new PIXI.Sprite(texture);

  mapSprite.width = app.screen.width;
  mapSprite.height = app.screen.height;

  mapSprite.interactive = true;
  mapSprite.buttonMode = true;

  app.stage.addChild(mapSprite);

  // Load and position the house image at the top-left corner
  const houseSprite = await loadSomething("./assets/house.png", 780, 470, 0.2, 0.2);
  houseSprite.interactive = true;
  houseSprite.buttonMode = true;

  houseSprite.scale.set(0.13, 0.13);
  
  // Add the house sprite to the stage
  app.stage.addChild(houseSprite);
  setupKeyControls();
  
  // Set up the click listener for the house sprite to redirect to gallery2.html
  houseSprite.on("pointerdown", () => {
    window.location.href = "galleryUser.html";
  });


  for (let i = 0; i < 5; i++) {
    // Generar posiciones aleatorias dentro de los rangos dados
    const randomX = Math.random() * (1200 - 725) + 725; // Rango de 725 a 1000
    const randomY = Math.random() * (900 - 300) + 300; // Rango de 300 a 700

    const lienzoSprite = await loadSomething("./assets/caballete.png", randomX, randomY, 0.4, 0.4);
    lienzoSprites.push(lienzoSprite);
    lienzoSprites[i].interactive = true;
    lienzoSprites[i].buttonMode = true;
  
    lienzoSprites[i].on("pointerdown", () => {
      window.location.href = "gallery.html";
    });
  }

// Cargar tarros de cerveza
for (let i = 0; i < 5; i++) {
  const randomX = Math.random() * (1200 - 725) + 725; // Rango de 725 a 1000
  const randomY = Math.random() * (900 - 300) + 300; // Rango de 300 a 700

  const beerSprite = await loadSomething("./assets/beer-mug.png", randomX, randomY, 0.2, 0.2);
  beerSprites.push(beerSprite);
  beerSprites[i].interactive = true;
  beerSprites[i].buttonMode = true;

  beerSprites[i].on("pointerdown", () => {
    window.location.href = "taberna.html";
  });
}
// SECCION CARGAR CARRETA

carreteSprite = await loadSomething("./assets/carreta1.png", 200, 200, 0.4, 0.4);
characterSprite = await loadCharacter(1200, 320, 1, 1);

// Configurar los puntos de destino en el centro de la pantalla
const areaWidth = 500;
const areaHeight = 500;
const areaX = (window.innerWidth - areaWidth) / 2;
const areaY = (window.innerHeight - areaHeight) / 2;

// Generar 10 puntos en el área central
const targetPoints = Array.from({ length: 10 }, () => ({
  x: Math.random() * areaWidth + areaX,
  y: Math.random() * areaHeight + areaY,
}));

let targetIndex = 2; // Índice del punto de destino actual
const tolerance = 10; // Tolerancia para llegar al destino
let lastCarreteMoveTime = Date.now();
const stopDuration = 5000; // Duración de la pausa en milisegundos (5 segundos)

// Hacer interactiva la carreta para redirigir a la tienda
carreteSprite.interactive = true;
carreteSprite.buttonMode = true;
carreteSprite.on("pointerdown", () => {
  window.location.href = "tienda.html";
});

setupKeyControls();

app.ticker.add(() => {
  const currentTime = Date.now();

  // Comprobar si se alcanzó el tiempo de espera
  if (currentTime - lastCarreteMoveTime >= stopDuration) {
    const target = targetPoints[targetIndex];
    const dx = target.x - carreteSprite.x;
    const dy = target.y - carreteSprite.y;

    // Si llegó al destino, avanzar al siguiente punto
    if (Math.abs(dx) < tolerance && Math.abs(dy) < tolerance) {
      targetIndex = (targetIndex + 1) % targetPoints.length; // Siguiente punto en bucle
      lastCarreteMoveTime = currentTime; // Reinicia el temporizador de espera
    } else {
      // Mover la carreta hacia el destino
      carreteSprite.x += dx * 0.05; // Ajusta velocidad en X
      carreteSprite.y += dy * 0.05; // Ajusta velocidad en Y
    }
  }
});

}

loadMap();
