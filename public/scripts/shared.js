let app; // Variable para almacenar la instancia de la aplicación
let characterSprite; // Sprite del personaje
let sprite;
let isImageMoving = false; // Variable para controlar si una imagen se está moviendo
let isCharacterMoving = false; // Variable para controlar si el personaje se está moviendo

// Inicializa la instancia de la aplicación PIXI
function initializePixiApplication(pixiApp) {
  app = pixiApp;
}

// Cargar el personaje
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

// Función para mover al personaje
function moveCharacterTo(targetX, targetY) {
  const speed = 5;

  // Si una imagen está siendo movida, no mover el personaje
  if (isImageMoving) return;

  isCharacterMoving = true; // Marcar que el personaje se está moviendo

  app.ticker.add(function animate() {
    const dx = targetX - characterSprite.x;
    const dy = targetY - characterSprite.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < speed) {
      characterSprite.x = targetX;
      characterSprite.y = targetY;
      app.ticker.remove(animate);
      isCharacterMoving = false; // El movimiento del personaje ha terminado
    }

    const angle = Math.atan2(dy, dx);
    characterSprite.x += Math.cos(angle) * speed;
    characterSprite.y += Math.sin(angle) * speed;
  });

  return characterSprite;
}

// Función para cargar algo (imágenes) con interacción
async function loadSomethingInteractive(directionTexture, targetX, targetY, scale1, scale2) {
  const texture = await PIXI.Assets.load(directionTexture);
  const sprite = new PIXI.Sprite(texture);

  const scaleX = app.screen.width / 1920;
  const scaleY = app.screen.height / 1080;

  sprite.x = targetX * scaleX;
  sprite.y = targetY * scaleY;

  sprite.anchor.set(0.5, 0.5);
  sprite.scale.set(scale1, scale2);

  // Hacer que la imagen sea interactiva
  sprite.interactive = true;
  sprite.buttonMode = true;

  // Función de mover la imagen (para arrastrar)
  sprite.on("pointerdown", (event) => {
    if (!isCharacterMoving) { // Solo permitir mover la imagen si el personaje no se está moviendo
      isImageMoving = true;  // Marcar que una imagen está en movimiento
      sprite.data = event.data;
      sprite.dragging = true;
    }
  });

  sprite.on("pointermove", () => {
    if (sprite.dragging) {
      const newPosition = sprite.data.getLocalPosition(sprite.parent);
      sprite.x = newPosition.x;
      sprite.y = newPosition.y;
    }
  });

  sprite.on("pointerup", () => {
    sprite.dragging = false;
    sprite.data = null;
    isImageMoving = false;  // Desmarcar el movimiento de la imagen
  });

  sprite.on("pointerupoutside", () => {
    sprite.dragging = false;
    sprite.data = null;
    isImageMoving = false;  // Desmarcar el movimiento de la imagen si el ratón sale del área
  });

  app.stage.addChild(sprite);

  return sprite;
}

// Exportar las funciones
export { initializePixiApplication, loadCharacter, moveCharacterTo, loadSomething, loadSomethingInteractive };
