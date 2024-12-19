import { initializePixiApplication, loadCharacter, moveCharacterTo, loadSomethingInteractive, saveImagePosition, loadImagePositions } from './shared.js';

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  antialiasing: true,
  transparent: false,
  resolution: 1,
});

app.renderer.backgroundColor = 0xff1234;
document.body.appendChild(app.view);

initializePixiApplication(app); // Inicializa la aplicación de PixiJS

let characterSprite; // El sprite del personaje

// Cargar la galería
async function loadGallery() {
  const params = new URLSearchParams(window.location.search);
  const lienzoIndex = params.get("lienzo") || "0"; // Valor por defecto si no se pasa el índice

  const galleryTexturePath = `./assets/galeria${lienzoIndex}.jpg`; // Ruta de la galería
  const galleryTexture = await PIXI.Assets.load('./assets/gallery.jpg');
  const gallerySprite = new PIXI.Sprite(galleryTexture);

  gallerySprite.width = app.screen.width;
  gallerySprite.height = app.screen.height;

  gallerySprite.interactive = true;
  gallerySprite.buttonMode = true;
  const tolerance = 25

  app.stage.addChild(gallerySprite);

  // Cargar el personaje
  characterSprite = await loadCharacter(600, 450, 1, 1);

  gallerySprite.on("pointerdown", (event) => {
    const position = event.data.global;
    characterSprite = moveCharacterTo(position.x, position.y);
  });

  const scaleX = app.screen.width / 1920;
  const scaleY = app.screen.height / 1080;

  app.ticker.add(() => {
    const characterBounds = characterSprite.getBounds();
    console.log('Character position - X: ${characterSprite.x}, Y: ${characterSprite.y}');

    if (Math.abs(characterBounds.x - 265 * scaleX) < tolerance &&
      Math.abs(characterBounds.y - 600 * scaleY) < tolerance) {
      window.location.href = "cuadro.html?image=1";
    }
    else if (Math.abs(characterBounds.x - 520 * scaleX) < tolerance &&
      Math.abs(characterBounds.y - 600 * scaleY) < tolerance) {
      window.location.href = "cuadro.html?image=2";
    }
    else if (Math.abs(characterBounds.x - 700 * scaleX) < tolerance &&
      Math.abs(characterBounds.y - 600 * scaleY) < tolerance) {
      window.location.href = "cuadro.html?image=3";
    }
  });
}

// Cargar posiciones guardadas al iniciar
function loadSavedImages() {
  const savedPositions = loadImagePositions();

  savedPositions.forEach(async (position) => {
    const newImage = await loadSomethingInteractive(position.imageId, position.x, position.y, 1, 1); // Cargar la imagen con la posición guardada

    newImage.x = position.x;
    newImage.y = position.y;

    newImage.interactive = true;
    newImage.buttonMode = true;

    newImage.on("pointerdown", (event) => {
      const newPosition = event.data.global;
      characterSprite = moveCharacterTo(newPosition.x, newPosition.y);

      // Guardar la nueva posición
      saveImagePosition(position.imageId, newPosition.x, newPosition.y);
    });

  });
}

// Función para manejar la subida de imágenes
document.getElementById("image-upload").addEventListener("change", (event) => {
  const file = event.target.files[0]; // Obtener el archivo seleccionado

  if (file) {
    const reader = new FileReader();

    reader.onload = async (e) => {
      const newImagePath = `./assets/assetsUser/galeriaImagen3.jpg`; // Ruta a la carpeta assetsUser
      const newImage = await loadSomethingInteractive(newImagePath, 600, 450, 1, 1); // Cargar la imagen en PixiJS

      newImage.interactive = true;
      newImage.buttonMode = true;

      newImage.on("pointerdown", (event) => {
        const position = event.data.global;

        // Mover el personaje
        characterSprite = moveCharacterTo(position.x, position.y);

        // Guardar la posición de la imagen
        saveImagePosition(newImagePath, position.x, position.y); // Usar la ruta como identificador único
      });
    };

    reader.readAsDataURL(file); // Lee el archivo como una URL de datos
  }
});

// Llamada inicial a la función para cargar la galería
loadGallery();

// Cargar las imágenes y posiciones guardadas
loadSavedImages();
