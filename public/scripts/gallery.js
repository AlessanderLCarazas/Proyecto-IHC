import { initializePixiApplication, loadCharacter, moveCharacterTo, loadSomethingInteractive } from './shared.js';

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

let characterSprite;
let isCharacterMoving = false; // Para saber si el personaje está en movimiento

// Función para cargar la galería inicial
async function loadGallery() {
    const params = new URLSearchParams(window.location.search);
    const lienzoIndex = params.get("lienzo") || "0"; // Valor predeterminado si no hay índice

    const galleryTexturePath = `./assets/galeria${lienzoIndex}.jpg`; // Ruta de la imagen inicial de la galería
    const galleryTexture = await PIXI.Assets.load(galleryTexturePath); // Cargar la textura
    const gallerySprite = new PIXI.Sprite(galleryTexture);

    gallerySprite.width = app.screen.width;
    gallerySprite.height = app.screen.height;

    gallerySprite.interactive = true;
    gallerySprite.buttonMode = true;

    app.stage.addChild(gallerySprite);

    // Cargar el personaje en la posición deseada
    characterSprite = await loadCharacter(600, 450, 1, 1);

    // Recuperar las imágenes y sus posiciones guardadas en localStorage
    const savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];

    // Cargar las imágenes guardadas y colocarlas en sus posiciones correspondientes
    savedImages.forEach(async (imageData) => {
        const newImage = await loadSomethingInteractive(imageData.path, imageData.x, imageData.y, 1, 1);
        newImage.interactive = true;
        newImage.buttonMode = true;

        newImage.on("pointerdown", (event) => {
            const position = event.data.global;
            characterSprite = moveCharacterTo(position.x, position.y);
        });
    });

    // Cargar una nueva imagen cuando se haga clic en el botón "Cargar más"
    const loadMoreButton = document.getElementById("load-more"); // Suponiendo que haya un botón con id "load-more"
    loadMoreButton.addEventListener("click", async () => {
        const newImagePath = `./assets/assetsUser/galeriaImagen${Math.floor(Math.random() * 10)}.jpg`; // Ruta aleatoria para una nueva imagen
        const newImage = await loadSomethingInteractive(newImagePath, 600, 450, 1, 1); // Usar la función loadSomethingInteractive

        newImage.interactive = true;
        newImage.buttonMode = true;

        newImage.on("pointerdown", (event) => {
            const position = event.data.global;
            characterSprite = moveCharacterTo(position.x, position.y);
        });

        // Guardar la imagen y su posición en localStorage
        const savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];
        savedImages.push({ path: newImagePath, x: newImage.x, y: newImage.y });
        localStorage.setItem('savedImages', JSON.stringify(savedImages)); // Guardar los datos actualizados
    });

    const scaleX = app.screen.width / 1920;
    const scaleY = app.screen.height / 1080;

    app.ticker.add(() => {
        const characterBounds = characterSprite.getBounds();

        console.log(`Character position - X: ${characterSprite.x}, Y: ${characterSprite.y}`);

        // Verificar si el personaje ha llegado a una posición específica y redirigir si es necesario
        if (Math.abs(characterBounds.x - 265 * scaleX) < 25 && Math.abs(characterBounds.y - 600 * scaleY) < 25) {
            window.location.href = "cuadro.html";
        } else if (Math.abs(characterBounds.x - 520 * scaleX) < 25 && Math.abs(characterBounds.y - 600 * scaleY) < 25) {
            window.location.href = "cuadro.html";
        } else if (Math.abs(characterBounds.x - 700 * scaleX) < 25 && Math.abs(characterBounds.y - 600 * scaleY) < 25) {
            window.location.href = "cuadro.html";
        }
    });
}

loadGallery();
