import {
  initializePixiApplication,
  loadCharacter,
  loadSomethingInteractive,
  loadSomething,
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
let defaultsSprites = [];
const speed = 10; // Movement speed
const tolerance = 25; // Distance tolerance for detecting locations

//DRAGGIND IMAGES

let draggedSprite = null; // Sprite que se está arrastrando
let dragging = false; // Bandera para evitar conflictos con otros movimientos

// Load the gallery
async function loadGallery() {
  const galleryTexture = await PIXI.Assets.load('./assets/GALERIA2ONLYESTANDARTES.png');
  const gallerySprite = new PIXI.Sprite(galleryTexture);

  gallerySprite.width = app.screen.width;
  gallerySprite.height = app.screen.height;

  app.stage.addChild(gallerySprite);

  // Load the character

  /*let element = await loadSomething('./assets/DIBUJO4.png', 100, 300, 0.7, 0.7);
  defaultsSprites.push(element);

  element = await loadSomething('./assets/DIBUJO5.png', 300, 330, 0.7, 0.7);
  defaultsSprites.push(element);*/

  let element = await loadSomething('./assets/PALOMITA.png', 1500, 600, 1, 1);
  defaultsSprites.push(element);

  element = await loadSomething('./assets/emblem5.png', 1750, 400, 0.6, 0.6);
  defaultsSprites.push(element);

  const cofre = await loadSomething('./assets/cofre.png', 1000, 940, 1, 1);
  cofre.interactive = true;
  cofre.buttonMode = true;
  defaultsSprites.push(cofre);

  defaultsSprites[2].on("pointerover", () => {
    // Crear la burbuja
    const bubble = new PIXI.Sprite(PIXI.Texture.from("assets/burbuja2.png"));
    bubble.x = 450 ; // Posición de la burbuja
    bubble.y = 640;
    bubble.width = 200; // Ajustar tamaño de la burbuja
    bubble.height = 100;

    // Crear el texto
    const message = new PIXI.Text("No has Subido \n Dibujos!!!", {
      fontFamily: "Arial",
      fontSize: 28,
      fill: "black",
      align: "center",
    });
    message.anchor.set(0.1); // Centrar el texto dentro de la burbuja
    message.x = bubble.width / 2;
    message.y = bubble.height / 2;

    // Añadir el texto a la burbuja como su hijo
    bubble.addChild(message);

    // Añadir la burbuja al escenario
    app.stage.addChild(bubble);

    // Guardar referencias para eliminarlas luego
    defaultsSprites[2]._bubble = bubble;
  });

  defaultsSprites[2].on("pointerout", () => {
    // Eliminar la burbuja y el texto al retirar el cursor
    if (defaultsSprites[2]._bubble) {
      app.stage.removeChild(defaultsSprites[2]._bubble);
      defaultsSprites[2]._bubble.destroy();
      defaultsSprites[2]._bubble = null;
    }
  });


  characterSprite = await loadCharacter(600, 600, 2, 2);
  // Set up key controls for the character
  setupKeyControls();
  setupDragging();

  // Add the ticker logic for detecting interactions
  setupLocationDetection();
}

// Load saved image positions
function loadSavedImages() {
  const savedPositions = loadImagePositions();

  savedPositions.forEach(async (position) => {
    const newImage = await loadSomethingInteractive(position.imageId, position.x, position.y, 0.4, 0.4);

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

// Handle new image uploads
document.getElementById("image-upload").addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = async (e) => {
      const base64Image = e.target.result; // The base64 string of the uploaded image
      const newImage = await loadSomethingInteractive(base64Image, 600, 450, 0.5, 0.5);

      // Make the new image draggable
      newImage.interactive = true;
      newImage.buttonMode = true;

      newImage.on("pointerdown", (event) => {
        const position = event.data.global;
        //saveImagePosition(file.name, position.x, position.y); // Save its position
      });
      defaultsSprites.push(newImage);
      setupDragging();
    };
    reader.readAsDataURL(file); // Read the image file as a base64 string
  }
});

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
  const cuadro1Bounds = defaultsSprites[0].getBounds();
  const cuadro2Bounds = defaultsSprites[1].getBounds();

  app.ticker.add(() => {
    if (!characterSprite) return;

    const characterBounds = characterSprite.getBounds();

    // Check if the character is near specific locations
    if (
      Math.abs(characterBounds.x - cuadro1Bounds.x) < tolerance &&
      Math.abs(characterBounds.y - cuadro1Bounds.y) < tolerance
    ) {
      window.location.href = "cuadro.html?image=4";
    } else if (
      Math.abs(characterBounds.x - cuadro2Bounds.x) < tolerance &&
      Math.abs(characterBounds.y - cuadro2Bounds.y) < tolerance
    ) {
      window.location.href = "cuadro.html?image=5";
    }
  });
}

function setupDragging() {
  defaultsSprites.forEach((sprite) => {
    sprite.interactive = true;
    sprite.buttonMode = true;
    sprite.dragging = false;

    let dragData = null;

    // Al hacer clic, comienza a arrastrar
    sprite.on("pointerdown", (event) => {
      sprite.dragging = true;
      sprite.alpha = 0.8; // Reducir la opacidad para indicar que está siendo arrastrado
      dragData = event.data; // Guardar datos del evento (incluye posición)
    });
    sprite.on('pointerup', () => {
      sprite.dragging = false; // Desactivar arrastre
      sprite.alpha = 1; // Restaurar la opacidad
      dragData = null; // Limpiar datos de arrastre
    });
    sprite.on('pointerupoutside', () => {
      sprite.dragging = false; // Desactivar arrastre si se suelta fuera
      sprite.alpha = 1; // Restaurar la opacidad
      dragData = null; // Limpiar datos de arrastre
    });
    app.ticker.add(() => {
      if (sprite.dragging && dragData) {
        sprite.x = dragData.x;
        sprite.y = dragData.y;
      }
    });
  });
}

// Initial calls
loadGallery();
loadSavedImages();
