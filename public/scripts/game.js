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
const castillo1enun = "¡Sea bienvenido \n a la purga \n de los malditos \n Disfruta tu estancia!!."

async function loadMap() {
    const texture = await PIXI.Assets.load("./assets/mapsouthamerica.jpg");
    const mapSprite = new PIXI.Sprite(texture);

    mapSprite.width = app.screen.width;
    mapSprite.height = app.screen.height;

    mapSprite.interactive = true;
    mapSprite.buttonMode = true;

    app.stage.addChild(mapSprite);

    // Load and position the house image at the top-left corner
    const houseSprite = await loadSomething("./assets/profile4.png", 1000, 410, 0.2, 0.2);
    houseSprite.interactive = true;
    houseSprite.buttonMode = true;

    houseSprite.scale.set(0.3, 0.3);

    houseSprite.on("pointerdown", () => {
        window.location.href = "galleryUser.html";
    });

    houseSprite.on("pointerover", () => {
        // Crear la burbuja
        const bubble = new PIXI.Sprite(PIXI.Texture.from("assets/burbuja2.png"));
        bubble.x = 450; // Posición de la burbuja
        bubble.y = 300;
        bubble.width = 200; // Ajustar tamaño de la burbuja
        bubble.height = 100;
    
        // Crear el texto
        const message = new PIXI.Text("Este es la \n Ciudad Inicial \n Visitala!!!", {
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
        sprite1._bubble = bubble;
    });
    
    houseSprite.on("pointerout", () => {
        // Eliminar la burbuja y el texto al retirar el cursor
        if (sprite1._bubble) {
            app.stage.removeChild(sprite1._bubble);
            sprite1._bubble.destroy();
            sprite1._bubble = null;
        }
    });

    // Add the castle sprite to the stage
    const sprite1 = await loadSomething("./assets/CASTILLO1.png", 1000, 200, 0.8, 0.8);
    sprite1.interactive = true;
    sprite1.buttonMode = true;
    sprites.push(sprite1);

    const sprite2 = await loadSomething("./assets/CASTILLO2.png", 800, 600, 0.8, 0.8);
    sprite2.interactive = true;
    sprite2.buttonMode = true;
    sprites.push(sprite2);

    sprite1.on("pointerdown", () => {
        window.location.href = "forest_map.html";
    });

    sprite1.on("pointerover", () => {
        // Crear la burbuja
        const bubble = new PIXI.Sprite(PIXI.Texture.from("assets/burbuja2.png"));
        bubble.x = 450; // Posición de la burbuja
        bubble.y = 150;
        bubble.width = 200; // Ajustar tamaño de la burbuja
        bubble.height = 100;
    
        // Crear el texto
        const message = new PIXI.Text(castillo1enun, {
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
        sprite1._bubble = bubble;
    });
    
    sprite1.on("pointerout", () => {
        // Eliminar la burbuja y el texto al retirar el cursor
        if (sprite1._bubble) {
            app.stage.removeChild(sprite1._bubble);
            sprite1._bubble.destroy();
            sprite1._bubble = null;
        }
    });

    characterSprite = await loadCharacter(1200, 320, 1, 1);
    setupKeyControls();
}

loadMap();
