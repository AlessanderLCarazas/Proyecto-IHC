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

  async function loadGallery() {
    const galleryTexture = await PIXI.Assets.load("./assets/gallery.jpg");
    const gallerySprite = new PIXI.Sprite(galleryTexture);

    gallerySprite.width = app.screen.width;
    gallerySprite.height = app.screen.height;

    gallerySprite.interactive = true;
    gallerySprite.buttonMode = true;

    gallerySprite.on("pointerdown", (event) => {
      const position = event.data.global;
      moveCharacterTo(position.x, position.y);
    });

    app.stage.addChild(gallerySprite);
    loadCharacter();

    if (condition == "Toca la Puerta") {
      //Te retorna a la vista LoadMap()
    }
    
  }

  async function loadPuerta() {
    const puertaTexture = await PIXI.Assets.load("./assets/puerta.jpg");
    puertaSprite = new PIXI.Sprite(puertaTexture);
    puertaSprite.x = app.screen.width / 1.4;
    puertaSprite.y = app.screen.height / 2;

    puertaSprite.anchor.set(0.5, 0.5);
    puertaSprite.scale.set(1, 1);

    app.stage.addChild(puertaSprite);
  }

  loadGallery();