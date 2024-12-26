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
let carreteSprite; // Sprite de la carreta

//SOME DIFFERENT VARIABLES

const tolerance = 30;
let lastCarreteMoveTime = 0;
const moveInterval = 15000;


async function loadMap() {
    const texture = await PIXI.Assets.load("./assets/BOSQUECOMUN.jpg");
    const mapSprite = new PIXI.Sprite(texture);

    mapSprite.width = app.screen.width;
    mapSprite.height = app.screen.height;

    mapSprite.interactive = true;
    mapSprite.buttonMode = true;

    app.stage.addChild(mapSprite);

    // Load and position the house image at the top-left corner
    const houseSprite = await loadSomething("./assets/house.png", 900, 650, 0.5, 0.5);
    houseSprite.interactive = true;
    houseSprite.buttonMode = true;

    setupKeyControls();

    // Set up the click listener for the house sprite to redirect to gallery2.html
    houseSprite.on("pointerdown", () => {
        window.location.href = "galleryUser.html";
    });


    // Load the LIENZOs sprite
    let lienzoSprite = await loadSomething("./assets/GALERIADEARTE.png", 500, 600, 0.7, 0.7);
      lienzoSprites.push(lienzoSprite);
      lienzoSprites[0].interactive = true;
      lienzoSprites[0].buttonMode = true;
    
      lienzoSprites[0].on("pointerdown", () => {
        window.location.href = "gallery.html";
      });

    lienzoSprite = await loadSomething("./assets/GALERIADEARTE.png", 700, 600, 0.7, 0.7);
      lienzoSprites.push(lienzoSprite);
      lienzoSprites[1].interactive = true;
      lienzoSprites[1].buttonMode = true;
    
      lienzoSprites[1].on("pointerdown", () => {
        window.location.href = "gallery.html";
      });
      
    lienzoSprite = await loadSomething("./assets/GALERIADEARTE.png", 500, 800, 0.7, 0.7);
      lienzoSprites.push(lienzoSprite);
      lienzoSprites[2].interactive = true;
      lienzoSprites[2].buttonMode = true;
    
      lienzoSprites[2].on("pointerdown", () => {
        window.location.href = "gallery.html";
      });
    
    let beerSprite = await loadSomething("./assets/TABERNAICON.png", 700, 800, 0.5, 0.5);

    beerSprites.push(beerSprite);
        beerSprites[0].interactive = true;
        beerSprites[0].buttonMode = true;
    
    beerSprites[0].on("pointerdown", () => {
        window.location.href = "taberna.html";
        });

    // Function to check if a new sprite collides with any existing ones
    // Load caballete images
    /*generateSprites(lienzoSprites, "./assets/caballete.png", 0.4, 0.4, screen.width - 100, 600, 900);

    // Load beer mug images
    generateSprites(beerSprites, "./assets/beer-mug.png", 0.2, 0.2, screen.width - 100, 600, 900);*/


    // SECCION CARGAR CARRETA

    carreteSprite = await loadSomething("./assets/carreta1.png", 800, 700, 0.6, 0.6);
    characterSprite = await loadCharacter(1200, 420, 1, 1);

    // Configurar los puntos de destino en el centro de la pantalla
    const areaWidth = 500;
    const areaHeight = 500;
    const areaX = (window.innerWidth - areaWidth) / 2;
    const areaY = (window.innerHeight - areaHeight) / 2;

    // Generar 10 puntos en el área central
    const targetPoints = [
        { x: 1000/2, y: 1100/2 },
        { x: 450/2, y: 1000/2 },
        { x: 450/2, y: 850/2 },
        { x: 450/2, y: 1100/2 },
    ];

    let targetIndex = 2; // Índice del punto de destino actual
    const tolerance = 10; // Tolerancia para llegar al destino
    let lastCarreteMoveTime = Date.now();
    const stopDuration = 5000; // Duración de la pausa en milisegundos (5 segundos)

    // Hacer interactiva la carreta para redirigir a la tienda
    carreteSprite.interactive = true;
    carreteSprite.buttonMode = true;
    carreteSprite.on("pointerdown", () => {
        window.location.href = "tienda.html";
    });

    app.ticker.add(() => {
        const currentTime = Date.now();

        // Comprobar si se alcanzó el tiempo de espera
        if (currentTime - lastCarreteMoveTime >= stopDuration) {
            const target = targetPoints[targetIndex];
            const dx = target.x - carreteSprite.x;
            const dy = target.y - carreteSprite.y;

            // Si llegó al destino, avanzar al siguiente punto
            if (Math.abs(dx) < tolerance && Math.abs(dy) < tolerance) {
                targetIndex = (targetIndex + 1) % targetPoints.length; // Siguiente punto en bucle
                lastCarreteMoveTime = currentTime; // Reinicia el temporizador de espera
            } else {
                // Mover la carreta hacia el destino
                carreteSprite.x += dx * 0.009; // Ajusta velocidad en X
                carreteSprite.y += dy * 0.009; // Ajusta velocidad en Y
            }
        }
    });
}

function checkCollision(newX, newY, spriteList, width, height) {
    for (let sprite of spriteList) {
        // Check if the new sprite overlaps with any existing sprite
        if (
            newX < sprite.x + sprite.width &&
            newX + width > sprite.x &&
            newY < sprite.y + sprite.height &&
            newY + height > sprite.y
        ) {
            return true; // There is a collision
        }
    }
    return false; // No collision
}

// Function to generate random positions and avoid collisions
async function generateSprites(spriteList, spriteImage, scaleX, scaleY, maxWidth, minHeight, maxHeight, otherSprites) {
    for (let i = 0; i < 5; i++) {
        let randomX, randomY;
        let collision = true;

        // Keep generating random positions until there's no collision
        while (collision) {
            randomX = Math.random() * (screen.width - 200) + 100; // Rango de 100 a width-100
            randomY = Math.random() * (maxHeight - minHeight) + minHeight; // Rango de minHeight a maxHeight

            // Check if the new position collides with any existing sprite in the list (including other sprite types)
            collision = checkCollision(randomX, randomY, spriteList, spriteImage.width * scaleX, spriteImage.height * scaleY);
            // Additionally, check for collisions with sprites from other types (e.g., caballete vs beer mug)

        }

        // Load the sprite if no collision was detected
        const sprite = await loadSomething(spriteImage, randomX, randomY, scaleX, scaleY);
        spriteList.push(sprite);
        sprite.interactive = true;
        sprite.buttonMode = true;

        // Add event listener for the sprite
        sprite.on("pointerdown", () => {
            if (spriteImage.includes("caballete")) {
                window.location.href = "gallery.html";
            } else if (spriteImage.includes("beer-mug")) {
                window.location.href = "taberna.html";
            }
        });
    }
}

loadMap();