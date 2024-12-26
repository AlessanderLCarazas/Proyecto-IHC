import { initializePixiApplication, loadCharacter, moveCharacterTo, loadSomething, moveCarrete, setupKeyControls } from "./shared.js";

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
let sprites = []; // Sprite de la carreta

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
    const houseSprite = await loadSomething("./assets/profile4.png", 1700, 200, 0.3, 0.3);
    houseSprite.interactive = true;
    houseSprite.buttonMode = true;

    houseSprite.scale.set(0.3, 0.3);

    characterSprite = await loadCharacter(1200, 420, 1, 1);

    const sprite1 = await loadSomething("./assets/CASTILLO1.png", 1000, 200, 0.8, 0.8);
    sprite1.interactive = true;
    sprite1.buttonMode = true;
    sprites.push(sprite1);

    const sprite2 = await loadSomething("./assets/CASTILLO2.png", 800, 600, 0.8, 0.8);
    sprite2.interactive = true;
    sprite2.buttonMode = true;
    sprites.push(sprite2);
    
    houseSprite.on("pointerdown", () => {
        window.location.href = "galleryUser.html";
    });

    sprite1.on("pointerdown", () => {
        window.location.href = "forest_map.html";
    });        

    setupKeyControls();
}

loadMap();
