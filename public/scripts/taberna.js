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

async function loadTaberna() {
  // Cargar el fondo de la taberna (TABERNA2.png)
  const texture = await PIXI.Assets.load("./assets/TABERNA2.png");
  const mapSprite = new PIXI.Sprite(texture);

  mapSprite.width = app.screen.width;
  mapSprite.height = app.screen.height;

  mapSprite.interactive = true;
  mapSprite.buttonMode = true;

  app.stage.addChild(mapSprite);

  // Añadir Estadarte Evento
  loadEstandarteEvento();

  // Añadir Estadarte Evento
  loadEstandarteDestacado();

  // Añadir Estadarte Blogs
  loadEstandarteBlogs();

  // Añadir LoreMaster
  await addLoreMaster();

  // Añadir GUILDMASTER
  await addGUILDMASTER();


  // Añadir Grunt
  await addGrunt();

  // Añadir newbie2
  await addnewbie2();

  // Añadir antenita2
  await addantenita2();

  // Crear cuadro semitransparente 2
  const transparentBox1 = new PIXI.Graphics();
  transparentBox1.beginFill(0x000000, 0.8); // Color negro con opacidad 0.3
  transparentBox1.drawRect(1725, 420, 195, 354); // Tamaño y posición
  transparentBox1.endFill();

  transparentBox1.interactive = true;
  transparentBox1.buttonMode = true;

  // Cambiar el cursor cuando pase el mouse sobre el cuadro
  transparentBox1.on("pointerover", () => {
    app.view.style.cursor = "pointer"; // Cambiar a la manita
  });

  transparentBox1.on("pointerout", () => {
    app.view.style.cursor = "default"; // Volver al cursor normal
  });

  // Evento de clic
  transparentBox1.on("pointerdown", () => {
    characterSprite = moveCharacterTo(195, 354); // Mover el personaje hacia el transparentBox1
    window.location.href = "index.html"; // Regresar al mapa
  });

  app.stage.addChild(transparentBox1);


  // Cargar el personaje
  characterSprite = await loadCharacter(700, 700, 2.5, 2.5);
  setupKeyControls();
  // Inicia la conversación automáticamente
  showConversation();

  // Acción al hacer clic en el fondo (mover el personaje)
  mapSprite.on("pointerdown", (event) => {
    const position = event.data.global;
    characterSprite = moveCharacterTo(position.x, position.y);
  });

  // Lógica de movimiento del personaje y actualización de la pantalla
  app.ticker.add(() => {
    // Puedes agregar más lógica de animación o interacciones aquí si es necesario
  });
}


async function loadEstandarteBlogs() {
  // Cargar la textura del estandarte
  const estandarteBlogsTexture = await PIXI.Assets.load("./assets/ESTANDARTE1COMPLETO.png");
  const estandarteBlogsSprite = new PIXI.Sprite(estandarteBlogsTexture);

  // Establecer la posición y el tamaño del estandarte
  estandarteBlogsSprite.x = 1590; // Puedes cambiar las coordenadas X e Y a donde lo necesites
  estandarteBlogsSprite.y = -50; // Cambia la posición Y
  estandarteBlogsSprite.width = 225; // Ajusta el tamaño a tu gusto
  estandarteBlogsSprite.height = 420; // Ajusta el tamaño a tu gusto

  // Hacer la imagen interactiva
  estandarteBlogsSprite.interactive = true;
  estandarteBlogsSprite.buttonMode = true;

  // Cambiar el cursor cuando pase el mouse sobre la imagen
  estandarteBlogsSprite.on("pointerover", () => {
    app.view.style.cursor = "pointer"; // Cambiar el cursor a manita
  });

  estandarteBlogsSprite.on("pointerout", () => {
    app.view.style.cursor = "default"; // Volver al cursor normal
  });

  // Evento de clic (redirigir a otro archivo HTML)
  estandarteBlogsSprite.on("pointerdown", () => {
    console.log("Estandarte clickeado");
    window.location.href = "comunidad.html"; // Redirigir a otro archivo HTML
  });


  // Añadir la imagen al escenario
  app.stage.addChild(estandarteBlogsSprite);
}

async function loadEstandarteEvento() {
  // Cargar la textura del estandarte
  const estandarteEventoTexture = await PIXI.Assets.load("./assets/ESTANDARTE3COMPLETO.png");
  const estandarteEventoSprite = new PIXI.Sprite(estandarteEventoTexture);

  // Establecer la posición y el tamaño del estandarte
  estandarteEventoSprite.x = 20; // Puedes cambiar las coordenadas X e Y a donde lo necesites
  estandarteEventoSprite.y = -50; // Cambia la posición Y
  estandarteEventoSprite.width = 420; // Ajusta el tamaño a tu gusto
  estandarteEventoSprite.height = 420; // Ajusta el tamaño a tu gusto

  // Hacer la imagen interactiva
  estandarteEventoSprite.interactive = true;
  estandarteEventoSprite.buttonMode = true;

  // Cambiar el cursor cuando pase el mouse sobre la imagen
  estandarteEventoSprite.on("pointerover", () => {
    app.view.style.cursor = "pointer"; // Cambiar el cursor a manita
  });

  estandarteEventoSprite.on("pointerout", () => {
    app.view.style.cursor = "default"; // Volver al cursor normal
  });

  // Evento de clic (redirigir a otro archivo HTML)
  estandarteEventoSprite.on("pointerdown", () => {
    console.log("Estandarte clickeado");
    window.location.href = "eventos_vista.html"; // Redirigir a otro archivo HTML
  });


  // Añadir la imagen al escenario
  app.stage.addChild(estandarteEventoSprite);
}

// // // // 
async function loadEstandarteDestacado() {
  // Cargar la textura del estandarte
  const estandarteDestacadoTexture = await PIXI.Assets.load("./assets/ESTANDARTE2COMPLETO.png");
  const estandarteDestacadoSprite = new PIXI.Sprite(estandarteDestacadoTexture);

  // Establecer la posición y el tamaño del estandarte
  estandarteDestacadoSprite.x = 380; // Puedes cambiar las coordenadas X e Y a donde lo necesites
  estandarteDestacadoSprite.y = -52; // Cambia la posición Y
  estandarteDestacadoSprite.width = 225; // Ajusta el tamaño a tu gusto
  estandarteDestacadoSprite.height = 420; // Ajusta el tamaño a tu gusto

  // Hacer la imagen interactiva
  estandarteDestacadoSprite.interactive = true;
  estandarteDestacadoSprite.buttonMode = true;

  // Cambiar el cursor cuando pase el mouse sobre la imagen
  estandarteDestacadoSprite.on("pointerover", () => {
    app.view.style.cursor = "pointer"; // Cambiar el cursor a manita
  });

  estandarteDestacadoSprite.on("pointerout", () => {
    app.view.style.cursor = "default"; // Volver al cursor normal
  });

  // Evento de clic (redirigir a otro archivo HTML)
  estandarteDestacadoSprite.on("pointerdown", () => {
    console.log("Estandarte clickeado");
    //window.location.href = "nuevoArchivo11111111.html"; // Redirigir a otro archivo HTML
  });


  // Añadir la imagen al escenario
  app.stage.addChild(estandarteDestacadoSprite);
}


const conversation = [
  { personaje: 0, texto: "El surrealismo tiene algo fascinante, te hace pensar fuera de la realidad." },
  { personaje: 3, texto: "El arte clásico, como el Renacimiento, tiene una técnica impecable." },
  { personaje: 1, texto: "Claro, pero el arte moderno tiene una libertad única. Los colores y formas expresan mucho." },
  { personaje: 2, texto: "A veces siento que el arte moderno pierde algo de técnica, pero tiene mucha emoción." },
  { personaje: 4, texto: "La tecnología ha abierto nuevas formas de expresión." },
  { personaje: 1, texto: "El Renacimiento tiene una precisión increíble. Artistas como Leonardo eran maestros." },
  { personaje: 3, texto: "El Barroco también tiene mucha fuerza, especialmente con el uso de la luz." },
  { personaje: 0, texto: "Dalí, por ejemplo, rompió con todas las reglas y creó mundos surrealistas impresionantes." },
  { personaje: 4, texto: "Las instalaciones modernas nos hacen pensar diferente." },
  { personaje: 2, texto: "El arte contemporáneo invita a cada uno a interpretarlo a su manera." },
  { personaje: 1, texto: "Sí, pero no olvidemos que los clásicos sentaron las bases de todo lo que vino después." },
  { personaje: 3, texto: "Claro, los detalles en el arte clásico son incomparables. Cada trazo tiene un propósito." },
  { personaje: 4, texto: "El arte es más que técnica. Es una forma de expresar ideas." },
  { personaje: 0, texto: "Exacto, lo importante es lo que transmite la obra, sin importar la época o el estilo." },
  { personaje: 2, texto: "Eso es lo que me gusta del arte actual: te hace sentir y pensar de nuevas maneras." },
  { personaje: 1, texto: "Claro, pero los grandes maestros siguen siendo una inspiración para todos." },
  { personaje: 3, texto: "El arte contemporáneo también tiene su poder. Se adapta a los tiempos y las ideas nuevas." },
  { personaje: 4, texto: "Sí, el arte cambia, pero siempre busca transmitir algo." },
  { personaje: 0, texto: "Totalmente. Al final, lo que importa es el mensaje, sea con pinceles, cámara o tecnología." },
  { personaje: 2, texto: "Es interesante cómo las técnicas evolucionan, pero la esencia sigue siendo la misma." },
  { personaje: 1, texto: "Claro, y lo bueno es que ahora tenemos más formas de experimentar el arte." },
  { personaje: 3, texto: "Exacto, el cine y la fotografía también son medios artísticos." },
  { personaje: 4, texto: "El arte está en todas partes: música, diseño, arquitectura." },
  { personaje: 0, texto: "Es verdad, el arte no se limita a una sola forma. Es una expresión universal." },
  { personaje: 2, texto: "Aunque algunos piensan que lo más 'auténtico' es lo hecho a mano." },
  { personaje: 1, texto: "Es un debate interesante. La creación digital tiene su valor, aunque no sea lo mismo que una pintura tradicional." },
  { personaje: 3, texto: "Depende de lo que busques. El arte no tiene que ser solo visual, también puede ser conceptual." },
  { personaje: 4, texto: "Al final, es una cuestión de interpretación." },
  { personaje: 0, texto: "Exactamente. Lo que realmente importa es lo que te hace sentir una obra." },
  { personaje: 2, texto: "Eso es lo que me gusta del arte: siempre evoluciona." },
  { personaje: 1, texto: "Sí, es una forma de ver el mundo a través de los ojos del artista." },
  { personaje: 3, texto: "El arte puede cambiar nuestra perspectiva sobre todo." },
  { personaje: 4, texto: "Es una herramienta poderosa." }
];


let currentDialogue = 0; // Índice de conversación

// Coordenadas de los personajes
const posicionesPersonajes = [
  { x: app.screen.width * 0.45, y: app.screen.height * 0.53 }, // LoreMaster
  { x: app.screen.width * 0.06, y: app.screen.height * 0.51 },  // Grunt
  { x: app.screen.width * 0.62, y: app.screen.height * 0.68 }, // newbie2
  { x: app.screen.width * 0.75, y: app.screen.height * 0.69 },  // antenita2
  { x: app.screen.width * 0.74, y: app.screen.height * 0.35 }  // GUILDMASTER
];

// Función para mostrar los diálogos
async function showConversation() {
  const { personaje, texto } = conversation[currentDialogue];

  // Obtener las coordenadas del personaje según su índice
  const { x, y } = posicionesPersonajes[personaje];

  // Determina la posición del globo (izquierda o derecha) dependiendo de si el personaje está en la izquierda o derecha
  const xPos = personaje % 2 === 0 ? x - 80 : x + 80;
  const yPos = y - 120;

  // Mostrar el diálogo
  await showDialog(texto, xPos, yPos);

  // Avanzar al siguiente diálogo
  currentDialogue = (currentDialogue + 1) % conversation.length; // Reiniciar si es necesario

  // Esperar un tiempo y continuar la conversación
  setTimeout(showConversation, 2000); // 2 segundos entre diálogos
}

async function showDialog(text, x, y) {
  const dialogContainer = new PIXI.Container();

  // Cargar la textura de la burbuja
  const bubbleTexture = await PIXI.Assets.load("./assets/burbuja.png");
  const bubbleSprite = new PIXI.Sprite(bubbleTexture);

  bubbleSprite.anchor.set(0.5, 1); // Ajustar el ancla para centrarlo encima
  bubbleSprite.scale.set(0.66, 0.73); // Escalar al tamaño adecuado

  // Crear el texto del cuadro de diálogo
  const dialogText = new PIXI.Text(text, {
    fontFamily: 'Courier New',
    fontSize: 16,
    fill: 0x000000, // Color negro
    align: 'center',
    wordWrap: true,
    wordWrapWidth: 150, // Ajustar ancho del texto al ancho de la burbuja
  });

  dialogText.anchor.set(0.5, 0.85); // Centrar texto dentro de la burbuja
  dialogText.x = 0;
  dialogText.y = -bubbleSprite.height / 2 + 10; // Ajustar el texto dentro de la burbuja

  // Añadir la burbuja y el texto al contenedor
  dialogContainer.addChild(bubbleSprite, dialogText);

  // Posicionar el cuadro de diálogo
  dialogContainer.x = x;
  dialogContainer.y = y;

  // Añadirlo a la escena
  app.stage.addChild(dialogContainer);

  // Eliminar el cuadro de diálogo después de 3 segundos
  setTimeout(() => {
    app.stage.removeChild(dialogContainer);
  }, 4000);
}

// Función para añadir el LoreMaster
async function addLoreMaster() {
  const LoreMasterTexture = await PIXI.Assets.load("./assets/CHARACTER22NAME.png");
  const LoreMasterSprite = new PIXI.Sprite(LoreMasterTexture);

  LoreMasterSprite.x = app.screen.width * 0.4; // Posición en X
  LoreMasterSprite.y = app.screen.height * 0.62; // Posición en Y
  LoreMasterSprite.anchor.set(0.5, 0.5);
  LoreMasterSprite.scale.set(1.1, 1.1);

  app.stage.addChild(LoreMasterSprite);

}

// Función para añadir el Grunt
async function addGrunt() {
  const GruntTexture = await PIXI.Assets.load("./assets/CHARACTER12NAME.png");
  const GruntSprite = new PIXI.Sprite(GruntTexture);

  GruntSprite.x = app.screen.width * 0.1; // Posición en X
  GruntSprite.y = app.screen.height * 0.6; // Posición en Y
  GruntSprite.anchor.set(0.5, 0.5);
  GruntSprite.scale.set(1.1, 1.1);

  app.stage.addChild(GruntSprite);

}

// Función para añadir el newbie2
async function addnewbie2() {
  const newbie2Texture = await PIXI.Assets.load("./assets/newbie2NAME.png");
  const newbie2Sprite = new PIXI.Sprite(newbie2Texture);

  newbie2Sprite.x = app.screen.width * 0.58; // Posición en X
  newbie2Sprite.y = app.screen.height * 0.68; // Posición en Y
  newbie2Sprite.anchor.set(0.5, 0.5);
  newbie2Sprite.scale.set(0.8, 0.8);

  app.stage.addChild(newbie2Sprite);

}

// Función para añadir el antenita2
async function addantenita2() {
  const antenita2Texture = await PIXI.Assets.load("./assets/antenita2NAME.png");
  const antenita2Sprite = new PIXI.Sprite(antenita2Texture);

  antenita2Sprite.x = app.screen.width * 0.8; // Posición en X
  antenita2Sprite.y = app.screen.height * 0.7; // Posición en Y
  antenita2Sprite.anchor.set(0.5, 0.5);
  antenita2Sprite.scale.set(0.81, 0.81);

  app.stage.addChild(antenita2Sprite);

}

// Función para añadir el GUILDMASTER
async function addGUILDMASTER() {
  const GUILDMASTERTexture = await PIXI.Assets.load("./assets/GUILDMASTER.png");
  const GUILDMASTERSprite = new PIXI.Sprite(GUILDMASTERTexture);

  GUILDMASTERSprite.x = app.screen.width * 0.7; // Posición en X
  GUILDMASTERSprite.y = app.screen.height * 0.35; // Posición en Y
  GUILDMASTERSprite.anchor.set(0.5, 0.5);
  GUILDMASTERSprite.scale.set(0.8, 0.8);

  app.stage.addChild(GUILDMASTERSprite);

}

function setupKeyControls(speed = 5) {
  const keysPressed = {}; // Track currently pressed keys

  window.addEventListener("keydown", (event) => {
    keysPressed[event.key.toLowerCase()] = true;
  });

  window.addEventListener("keyup", (event) => {
    keysPressed[event.key.toLowerCase()] = false;
  });

  app.ticker.add(() => {
    if (!characterSprite) return;

    let dx = 0;
    let dy = 0;

    if (keysPressed["arrowup"] || keysPressed["w"]) dy -= speed;
    if (keysPressed["arrowdown"] || keysPressed["s"]) dy += speed;
    if (keysPressed["arrowleft"] || keysPressed["a"]) dx -= speed;
    if (keysPressed["arrowright"] || keysPressed["d"]) dx += speed;

    characterSprite.x += dx;
    characterSprite.y += dy;

    // Ensure the character stays within bounds
    characterSprite.x = Math.max(0, Math.min(app.screen.width, characterSprite.x));
    characterSprite.y = Math.max(0, Math.min(app.screen.height, characterSprite.y));
  });
}

loadTaberna();