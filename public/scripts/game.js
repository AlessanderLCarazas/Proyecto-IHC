import { initializePixiApplication, loadCharacter, moveCharacterTo, loadSomething, moveCarrete} from "./shared.js";

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
const moveInterval = 30000;


async function loadMap() {
  const texture = await PIXI.Assets.load("./assets/mapsouthamerica.jpg");
  const mapSprite = new PIXI.Sprite(texture);

  mapSprite.width = app.screen.width;
  mapSprite.height = app.screen.height;

  mapSprite.interactive = true;
  mapSprite.buttonMode = true;

  app.stage.addChild(mapSprite);

  // Load and position the house image at the top-left corner
  const houseTexture = await PIXI.Assets.load("./assets/profile4.png");
  const houseSprite = new PIXI.Sprite(houseTexture);
  
  houseSprite.x = 0; // Position it at the top-left corner
  houseSprite.y = 0;
  houseSprite.interactive = true;
  houseSprite.buttonMode = true;

  houseSprite.scale.set(0.3, 0.3);
  
  // Add the house sprite to the stage
  app.stage.addChild(houseSprite);
  
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
  }

  // Cargar tarros de cerveza
  for (let i = 0; i < 5; i++) {
    const randomX = Math.random() * (1200 - 725) + 725; // Rango de 725 a 1000
    const randomY = Math.random() * (900 - 300) + 300; // Rango de 300 a 700

    const beerSprite = await loadSomething("./assets/beer-mug.png", randomX, randomY, 0.2, 0.2);
    beerSprites.push(beerSprite); // Agregar el tarro de cerveza al arreglo
  }
  //SECCION CARGAR CARRETA

  carreteSprite = await loadSomething("./assets/carreta1.png", 200, 200, 0.4, 0.4);
  characterSprite = await loadCharacter(1200, 320, 1, 1);

  mapSprite.on("pointerdown", (event) => {
    const position = event.data.global;
    characterSprite = moveCharacterTo(position.x, position.y);
  });

  app.ticker.add(() => {
    const currentTime = Date.now();
    const characterBounds = characterSprite.getBounds();
    const carretaBounds = carreteSprite.getBounds();

    lienzoSprites.forEach((lienzoSprite, index) => {
      const lienzoBounds = lienzoSprite.getBounds();
      if (
        Math.abs(characterBounds.x - lienzoBounds.x) < tolerance &&
        Math.abs(characterBounds.y - lienzoBounds.y) < tolerance
      ) {
        window.location.href = `gallery.html?lienzo=${index}`;
      }
    });
    
    // Comprobar si el personaje está cerca de un tarro de cerveza
    beerSprites.forEach((beerSprite, index) => {
      const beerBounds = beerSprite.getBounds();
      if (
        Math.abs(characterBounds.x - beerBounds.x) < tolerance &&
        Math.abs(characterBounds.y - beerBounds.y) < tolerance
      ) {
        window.location.href = `taberna.html?beer=${index}`; // Redirigir a la página taberna.html
      }
    });
    

    const beerBounds = beerSprites[0].getBounds();
    console.log(characterBounds);
    console.log(beerBounds);
    if (Math.abs(characterBounds.x - beerBounds.x) < tolerance &&
        Math.abs(characterBounds.y - beerBounds.y) < tolerance) {
        window.location.href = "gallery.html";
    }

    const lienzoBounds = lienzoSprites[0].getBounds();
    console.log(characterBounds);
    console.log(lienzoBounds);
    if (Math.abs(characterBounds.x - lienzoBounds.x) < tolerance &&
      Math.abs(characterBounds.y - lienzoBounds.y) < tolerance) {
      window.location.href = "gallery.html";
    }

    if (Math.abs(characterBounds.x - carretaBounds.x) < tolerance &&
      Math.abs(characterBounds.y - carretaBounds.y) < tolerance) {
      window.location.href = "tienda.html";
    }

    if (currentTime - lastCarreteMoveTime >= moveInterval) {
      // Si ha pasado un minuto, mueve la carreta
      const randomX = Math.floor(Math.random() * (1200 - 725)) + 725;
      const randomY = Math.floor(Math.random() * (900 - 300)) + 300;
      carreteSprite = moveCarrete(carreteSprite, randomX, randomY);

      // Actualiza el tiempo de la última vez que se movió la carreta
      lastCarreteMoveTime = currentTime;
    }
  });
}

loadMap();
