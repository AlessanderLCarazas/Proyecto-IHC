import { 
  initializePixiApplication, 
  loadCharacter, 
  loadSomethingInteractive, 
  saveImagePosition, 
  loadImagePositions 
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
const speed = 10; // Movement speed
const tolerance = 25; // Distance tolerance for detecting locations

// Load the gallery
async function loadGallery() {
  const galleryTexture = await PIXI.Assets.load('./assets/gallery.jpg');
  const gallerySprite = new PIXI.Sprite(galleryTexture);

  gallerySprite.width = app.screen.width;
  gallerySprite.height = app.screen.height;

  app.stage.addChild(gallerySprite);

  // Load the character
  characterSprite = await loadCharacter(300, 800, 2, 2);

  // Set up key controls for the character
  setupKeyControls();

   // Add the ticker logic for detecting interactions
  setupLocationDetection();
}

// Load saved image positions
function loadSavedImages() {
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
}


// Add movement controls (arrows and WASD)
function setupKeyControls() {
  const keysPressed = {}; // Track currently pressed keys

  window.addEventListener("keydown", (event) => {
    keysPressed[event.key.toLowerCase()] = true;
  });

  window.addEventListener("keyup", (event) => {
    keysPressed[event.key.toLowerCase()] = false;
  });

  app.ticker.add(() => {
    if (!characterSprite) return;

    let dx = 0;
    let dy = 0;

    if (keysPressed["arrowup"] || keysPressed["w"]) dy -= speed;
    if (keysPressed["arrowdown"] || keysPressed["s"]) dy += speed;
    if (keysPressed["arrowleft"] || keysPressed["a"]) dx -= speed;
    if (keysPressed["arrowright"] || keysPressed["d"]) dx += speed;

    characterSprite.x += dx;
    characterSprite.y += dy;

    // Ensure the character stays within bounds
    characterSprite.x = Math.max(0, Math.min(app.screen.width, characterSprite.x));
    characterSprite.y = Math.max(0, Math.min(app.screen.height, characterSprite.y));
  });
}

// Add location detection logic
function setupLocationDetection() {
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
}

// Initial calls
loadGallery();
loadSavedImages();
