import { initializePixiApplication } from "./shared.js";

// Crear una aplicación PIXI
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  antialiasing: true,
  transparent: false,
  resolution: 1,
});

app.renderer.backgroundColor = 0x1234ff;
document.body.appendChild(app.view);

initializePixiApplication(app);

// Variables globales
let carreteSprite; // Sprite de la carreta
let targetPoints = []; // Array de puntos de destino
let targetIndex = 0; // Índice del punto de destino actual
const tolerance = 5; // Tolerancia para determinar si la carreta ha llegado al punto

// Limitar los puntos a un área específica (por ejemplo, una región de 500x500 píxeles)
const areaWidth = 500;
const areaHeight = 500;
const areaX = (window.innerWidth - areaWidth) / 2; // Posición X de la esquina superior izquierda
const areaY = (window.innerHeight - areaHeight) / 2; // Posición Y de la esquina superior izquierda

// Generar 10 puntos dentro del área definida
function generateTargetPoints() {
  for (let i = 0; i < 10; i++) {
    const randomX = Math.random() * areaWidth + areaX;  // Generar punto aleatorio X dentro del área
    const randomY = Math.random() * areaHeight + areaY; // Generar punto aleatorio Y dentro del área
    targetPoints.push({ x: randomX, y: randomY });
  }
}

// Cargar el sprite de la carreta y posicionarlo en el primer punto
async function loadCarrete() {
  const carreteTexture = await PIXI.Assets.load("./assets/carreta1.png");
  carreteSprite = new PIXI.Sprite(carreteTexture);

  carreteSprite.x = targetPoints[0].x;  // Posicionar al primer punto
  carreteSprite.y = targetPoints[0].y;

  carreteSprite.anchor.set(0.5, 0.5);  // Centrar el ancla
  carreteSprite.scale.set(0.2, 0.2);   // Escalar el sprite

  app.stage.addChild(carreteSprite);   // Añadir la carreta al escenario

  // Establecer el zIndex de la carreta para que se dibuje encima de otros objetos
  carreteSprite.zIndex = 1000; // Un valor alto asegura que esté por encima de otros elementos.
  app.stage.sortChildren(); // Ordenar los objetos en el escenario según su zIndex
}

// Función para mover la carreta
function moveCarrete() {
  if (!carreteSprite) return;

  const target = targetPoints[targetIndex];  // Obtener el punto de destino actual
  const dx = target.x - carreteSprite.x;     // Diferencia en el eje X
  const dy = target.y - carreteSprite.y;     // Diferencia en el eje Y

  // Si la carreta ha llegado al destino, ir al siguiente punto
  if (Math.abs(dx) < tolerance && Math.abs(dy) < tolerance) {
    targetIndex = (targetIndex + 1) % targetPoints.length;  // Volver al primer punto después del último
  }

  // Mover la carreta hacia el siguiente punto
  carreteSprite.x += dx * 0.01;  // Ajustar velocidad en el eje X
  carreteSprite.y += dy * 0.01;  // Ajustar velocidad en el eje Y
}

// Función principal para inicializar la carreta y el recorrido
async function initCarrete() {
  generateTargetPoints(); // Generar puntos dentro del área definida
  await loadCarrete();    // Cargar el sprite de la carreta

  // Añadir un ticker para mover la carreta en cada frame
  app.ticker.add(() => {
    moveCarrete();
  });
}

// Inicializar la carreta y su recorrido
initCarrete()