import { initializePixiApplication, loadCharacter, moveCharacterTo } from "./shared.js";

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

  async function loadGallery() {
    const params = new URLSearchParams(window.location.search);
    const lienzoIndex = params.get("lienzo") || "0"; // Valor predeterminado si no hay índice

    const galleryTexturePath = `./assets/galeria${lienzoIndex}.jpg`;

    const galleryTexture = await PIXI.Assets.load("./assets/gallery.jpg");
    const gallerySprite = new PIXI.Sprite(galleryTexture);

    gallerySprite.width = app.screen.width;
    gallerySprite.height = app.screen.height;

    gallerySprite.interactive = true;
    gallerySprite.buttonMode = true;

    const tolerance = 25

    app.stage.addChild(gallerySprite);
    characterSprite = await loadCharacter(600, 450, 1,1);

    gallerySprite.on("pointerdown", (event) => {
      const position = event.data.global;
      characterSprite = moveCharacterTo(position.x, position.y);
    });

    const scaleX = app.screen.width / 1920;
    const scaleY = app.screen.height / 1080;

    app.ticker.add(() => {
      const characterBounds = characterSprite.getBounds();
      console.log(`Character position - X: ${characterSprite.x}, Y: ${characterSprite.y}`);
      
      if (Math.abs(characterBounds.x - 265*scaleX) < tolerance &&
        Math.abs(characterBounds.y - 600*scaleY) < tolerance) {
        window.location.href = "cuadro.html";
        }
      else if (Math.abs(characterBounds.x - 520*scaleX) < tolerance &&
        Math.abs(characterBounds.y - 600*scaleY) < tolerance) {
        window.location.href = "cuadro.html";
        }
      else if (Math.abs(characterBounds.x - 700*scaleX) < tolerance &&
        Math.abs(characterBounds.y - 600*scaleY) < tolerance) {
        window.location.href = "cuadro.html";
        }
    });
  }
  loadGallery();