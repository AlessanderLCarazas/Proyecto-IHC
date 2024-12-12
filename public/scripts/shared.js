let app; // Variable para almacenar la instancia de la aplicación
let characterSprite; // Sprite del personaje

// Inicializa la instancia de la aplicación PIXI
function initializePixiApplication(pixiApp) {
  app = pixiApp;
}

async function loadCharacter() {
  const characterTexture = await PIXI.Assets.load("./assets/character.png");
  characterSprite = new PIXI.Sprite(characterTexture);

  characterSprite.x = app.screen.width / 1.4;
  characterSprite.y = app.screen.height / 2;

  characterSprite.anchor.set(0.5, 0.5);
  characterSprite.scale.set(1, 1);

  app.stage.addChild(characterSprite);

  return characterSprite;
}

let isInTaberna = false; // Bandera global para identificar si estamos en la taberna

function moveCharacterTo(targetX, targetY) {
  const speed = 5;
  app.ticker.add(function animate() {
      const dx = targetX - characterSprite.x;
      const dy = isInTaberna ? 0 : (targetY - characterSprite.y); // Solo mueve en X si está en la taberna

      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < speed) {
          characterSprite.x = targetX;
          if (!isInTaberna) characterSprite.y = targetY; // Mover en Y solo fuera de la taberna
          app.ticker.remove(animate);
      }

      const angle = Math.atan2(dy, dx);
      characterSprite.x += Math.cos(angle) * speed;
      characterSprite.y += Math.sin(angle) * speed;
  });
  return characterSprite;
}


// Exportar las funciones
export { initializePixiApplication, loadCharacter, moveCharacterTo };
