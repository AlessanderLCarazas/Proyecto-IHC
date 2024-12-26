import { 
  initializePixiApplication, 
  loadCharacter, 
  loadSomethingInteractive,
  loadSomeArt,  
  loadSomething,
  saveImagePosition, 
  loadImagePositions,
  setupKeyControls
} from './shared.js';

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

let characterSprite; // The character sprite
// Distance tolerance for detecting locations
const toleranceX = 25; 
const toleranceY = 50;
//Si se quiere reemplazar por un tamaño genérico
const H = 100;  
const W = 150;
//Load portals
const Portals = []; //Back to the beginning
//LOAD THE IMAGES
const galleryImages = [
  { file: './assets/DIBUJO1.png', x: 365, y: 500, width: H, height: W, targetUrl: 'cuadro.html?image=1' },
  { file: './assets/DIBUJO2.png', x: 530, y: 500, width: H, height: W, targetUrl: 'cuadro.html?image=2' },
  { file: './assets/DIBUJO3.png', x: 710, y: 500, width: H, height: W, targetUrl: 'cuadro.html?image=3' },
];

const tolerance = 25; // Distance tolerance for detecting locations
let flechaSprite; // The back arrow sprite

// Load the gallery
async function loadGallery() {
  const galleryTexture = await PIXI.Assets.load('./assets/gallery.jpg');
  const gallerySprite = new PIXI.Sprite(galleryTexture);

  gallerySprite.width = app.screen.width;
  gallerySprite.height = app.screen.height;

  app.stage.addChild(gallerySprite);

  const dibujo1 = await loadSomething('assets/DIBUJO1.png', 550, 650, 0.2, 0.2);
  dibujo1.interactive = true;
  dibujo1.buttonMode = true;
  const dibujo2 = await loadSomething('assets/DIBUJO2.png', 750, 650, 0.2, 0.2);
  dibujo2.interactive = true;
  dibujo2.buttonMode = true;
  const dibujo3 = await loadSomething('assets/DIBUJO3.png', 330, 650, 0.2, 0.2);
  dibujo3.interactive = true;
  dibujo3.buttonMode = true;
  const puerta1 = await loadSomething('assets/puerta.png', 150, 720, 1, 1);
  puerta1.interactive = true;
  puerta1.buttonMode = true;
  const puerta2 = await loadSomething('assets/puerta.png', 1780, 850, 1, 1);
  puerta2.interactive = true;
  puerta2.buttonMode = true;

  // Load the character
  characterSprite = await loadCharacter(700, 800, 1, 1);

  // Load the portals
  await loadPortals();
  // Set up key controls for the character
  setupKeyControls();

   // Add the ticker logic for detecting interactions (ART GALLERY MAIN INTERACTION)
  for (const image of galleryImages) {
    const imageSprite = await loadSomeArt(image.file, image.x, image.y, image.width, image.height);

    // Image interactivity
    imageSprite.interactive = true;
    imageSprite.buttonMode = true;

    // When clicked
    imageSprite.on('pointerdown', () => {
      window.location.href = image.targetUrl;
    });

    // Add to scenary
    app.stage.addChild(imageSprite);
  }
  //setupLocationDetection();
  setupPortalDetection();

  dibujo1.on('pointerdown', () => {
    window.location.href = 'cuadro.html?image=1';
  });

  dibujo2.on('pointerdown', () => {
    window.location.href = 'cuadro.html?image=2';
  });

  dibujo3.on('pointerdown', () => {
    window.location.href = 'cuadro.html?image=3';
  });

  puerta1.on('pointerdown', () => {
    window.location.href = 'forest_map.html';
  });

  puerta2.on('pointerdown', () => {
    window.location.href = 'forest_map.html';
  });

  /*// Add the ticker logic for detecting interactions
  setupLocationDetection();*/

  // Add the back arrow
  await loadBackArrow();
}

// Load saved image positions
function loadSavedImages() {
  const savedPositions = loadImagePositions();

  savedPositions.forEach(async (position) => {
    const newImage = await loadSomeArt(position.imageId, position.x, position.y, H, W);

    newImage.interactive = true;
    newImage.buttonMode = true;

    newImage.on('pointerdown', (event) => {
      const newPosition = event.data.global;

      saveImagePosition(position.imageId, newPosition.x, newPosition.y);
    });
  });
}

//PORTAL INTEGRATION (BACK TO THE BEGINNING)


async function loadPortals() {
  //PORTAL POSITIONS
  const portalPositions = [
    { x: 150, y: 730 },
    { x: 1760, y: 890 },
  ]; // Posiciones de los sprites cuadrados

  for (const position of portalPositions) {
    const portal = await loadSomeArt('./assets/portal.png', position.x, position.y, 100, 150);

    Portals.push(portal); // Agregar a la lista de sprites cuadrados
  }
}

// Detectar colisiones entre el personaje y los sprites cuadrados
function setupPortalDetection() {
  app.ticker.add(() => {
    if (!characterSprite) return;

    const characterBounds = characterSprite.getBounds();

    for (const portal of Portals) {
      const portalBounds = portal.getBounds();

      // Check colision
      if (
        characterBounds.x < portalBounds.x + portalBounds.width &&
        characterBounds.x + characterBounds.width > portalBounds.x &&
        characterBounds.y < portalBounds.y + portalBounds.height &&
        characterBounds.y + characterBounds.height > portalBounds.y
      ) {
        // (index.html)
        window.location.href = "index.html";
        console.log('Colisión detectada: redirigiendo a index.html');
      }
    }
  });
}
/*function loadSavedImages() {
  const savedPositions = loadImagePositions();

  savedPositions.forEach(async (position) => {
    const newImage = await loadSomethingInteractive(position.imageId, position.x, position.y, 1, 1);

    newImage.x = position.x;
    newImage.y = position.y;

    newImage.interactive = true;
    newImage.buttonMode = true;

    newImage.on("pointerdown", (event) => {
      const newPosition = event.data.global;

      saveImagePosition(position.imageId, newPosition.x, newPosition.y);
    });
  });
}*/

// Add location detection logic
/*function setupLocationDetection() {
  const scaleX = app.screen.width / 1920;
  const scaleY = app.screen.height / 1080;
  
  app.ticker.add(() => {
    if (!characterSprite) return;

    const characterBounds = characterSprite.getBounds();

    // Check if the character is near specific locations
    if (
      Math.abs(characterBounds.x - 265 * scaleX) < tolerance &&
      Math.abs(characterBounds.y - 600 * scaleY) < tolerance
    ) {
      window.location.href = "cuadro.html?image=3";
    } else if (
      Math.abs(characterBounds.x - 520 * scaleX) < tolerance &&
      Math.abs(characterBounds.y - 600 * scaleY) < tolerance
    ) {
      window.location.href = "cuadro.html?image=1";
    } else if (
      Math.abs(characterBounds.x - 700 * scaleX) < tolerance &&
      Math.abs(characterBounds.y - 600 * scaleY) < tolerance
    ) {
      window.location.href = "cuadro.html?image=2";
    }
  });
  
}*/

// Load the back arrow
async function loadBackArrow() {
  const flechaTexture = await PIXI.Assets.load('./assets/flecha.png');
  flechaSprite = new PIXI.Sprite(flechaTexture);

  flechaSprite.x = 5; // Position the arrow in the top left corner
  flechaSprite.y = 5;

  // Scale the arrow to 20% of its original size
  flechaSprite.scale.set(0.2);

  // Make the arrow interactive
  flechaSprite.interactive = true;
  flechaSprite.buttonMode = true;

  // Add functionality to go back to the previous page
  flechaSprite.on('pointerdown', () => {
    window.history.back(); // Go back to the previous page
  });

  // Add the back arrow to the stage
  app.stage.addChild(flechaSprite);
}

// Initial calls
loadGallery();
loadSavedImages();