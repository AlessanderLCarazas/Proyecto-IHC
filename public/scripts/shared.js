let app; // Variable para almacenar la instancia de la aplicación
let characterSprite; // Sprite del personaje
let sprite;

// Inicializa la instancia de la aplicación PIXI
function initializePixiApplication(pixiApp) {
  app = pixiApp;
}

async function loadCharacter(targetX, targetY, scale1, scale2) {
  const characterTexture = await PIXI.Assets.load("./assets/character.png");
  characterSprite = new PIXI.Sprite(characterTexture);

  const scaleX = app.screen.width / 1920;
  const scaleY = app.screen.height / 1080;

  characterSprite.x = targetX * scaleX;
  characterSprite.y = targetY * scaleY;

  characterSprite.anchor.set(0.5, 0.5);
  characterSprite.scale.set(scale1, scale2);

  app.stage.addChild(characterSprite);

  return characterSprite;
}

function moveCharacterTo(targetX, targetY) {
  const speed = 5;
  app.ticker.add(function animate() {
    const dx = targetX - characterSprite.x;
    const dy = targetY - characterSprite.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < speed) {
      characterSprite.x = targetX;
      characterSprite.y = targetY;
      app.ticker.remove(animate);
    }

    const angle = Math.atan2(dy, dx);
    characterSprite.x += Math.cos(angle) * speed;
    characterSprite.y += Math.sin(angle) * speed;
    
  });
  return characterSprite;
}

async function loadSomething(directionTexture, targetX, targetY, scale1, scale2) {
  const texture = await PIXI.Assets.load(directionTexture);
  const sprite = new PIXI.Sprite(texture);

  // Escalar las coordenadas lógicas a las dimensiones reales de la pantalla
  const scaleX = app.screen.width / 1920;
  const scaleY = app.screen.height / 1080;

  sprite.x = targetX * scaleX;
  sprite.y = targetY * scaleY;

  sprite.anchor.set(0.5, 0.5);
  sprite.scale.set(scale1, scale2);

  app.stage.addChild(sprite);

  return sprite;
}

// Exportar las funciones
export { initializePixiApplication, loadCharacter, moveCharacterTo, loadSomething };
