import { initializePixiApplication, loadCharacter, moveCharacterTo } from "./shared.js";

const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    antialiasing: true,
    transparent: false,
    resolution: 1,
});

document.body.appendChild(app.view);
initializePixiApplication(app);

let characterSprite;

// Bandera para restringir el movimiento en la taberna
let isInTaberna = true;

async function loadTaberna() {
    isInTaberna = true; // Restricción en el movimiento dentro de la taberna
    const tabernaTexture = await PIXI.Assets.load("./assets/taberna-fondo.jpg");
    const tabernaSprite = new PIXI.Sprite(tabernaTexture);

    tabernaSprite.width = app.screen.width;
    tabernaSprite.height = app.screen.height;

    tabernaSprite.interactive = true;
    tabernaSprite.buttonMode = true;

    tabernaSprite.on("pointerdown", (event) => {
        const position = event.data.global;
        moveCharacterTo(position.x, characterSprite.y); // Solo mover en X
    });

    app.stage.addChild(tabernaSprite);

    // Agregar el letrero
    await addLetrero();

    // Añadir el tabernero
    await addBartender();

    // Añadir la pareja
    await addCouple();

    // Cargar el personaje
    characterSprite = await loadCharacter();

    characterSprite.x = app.screen.width * 0.1;
    characterSprite.y = app.screen.height * 0.9;

    // Agregar la flecha para salir
    await addExitArrow();

}


// Función para agregar la flecha
async function addExitArrow() {
    const arrowTexture = await PIXI.Assets.load("./assets/flecha.png");
    const arrowSprite = new PIXI.Sprite(arrowTexture);

    arrowSprite.x = app.screen.width * 0.05; // Posición en X
    arrowSprite.y = app.screen.height * 0.6; // Posición en Y
    arrowSprite.anchor.set(0.5, 0.5);
    arrowSprite.scale.set(0.5, 0.5);

    arrowSprite.interactive = true;
    arrowSprite.buttonMode = true; // Cambiar el cursor al pasar sobre la flecha
    arrowSprite.cursor = "pointer";

    arrowSprite.on("pointerdown", () => {
        moveCharacterTo(arrowSprite.x, characterSprite.y); // Mover el personaje hacia la flecha
        setTimeout(() => {
            showExitModal();
        }, 1000); // Esperar 1 segundo antes de mostrar el modal
    });

    app.stage.addChild(arrowSprite);
}

// Mostrar el modal de salida
function showExitModal() {
    const modal = document.getElementById("exit-modal");
    modal.style.display = "flex";

    document.getElementById("exit-accept-button").onclick = () => {
        window.location.href = "index.html"; // Regresar al mapa
    };

    document.getElementById("exit-decline-button").onclick = () => {
        modal.style.display = "none"; // Cerrar el modal
    };
}

// Función para añadir el tabernero
async function addBartender() {
    const bartenderTexture = await PIXI.Assets.load("./assets/tabernero.png");
    const bartenderSprite = new PIXI.Sprite(bartenderTexture);

    bartenderSprite.x = app.screen.width * 0.4; // Posición en X
    bartenderSprite.y = app.screen.height * 0.85; // Posición en Y
    bartenderSprite.anchor.set(0.5, 0.5);
    bartenderSprite.scale.set(0.3, 0.3);

    app.stage.addChild(bartenderSprite);

    // Revisar si el personaje está cerca del tabernero
    app.ticker.add(() => {
        const characterBounds = characterSprite.getBounds();
        const bartenderBounds = bartenderSprite.getBounds();

        const distance = Math.abs(characterBounds.x - bartenderBounds.x);
        if (distance < 50) {
            // Mostrar cuadro de diálogo
            showDialog("¡Bienvenido a la Taberna del Majo!", bartenderSprite.x-20, bartenderSprite.y-90);
        }
    });
}


async function addCouple() {
    const coupleTexture = await PIXI.Assets.load("./assets/pareja.png");
    const coupleSprite = new PIXI.Sprite(coupleTexture);

    // Posicionar la pareja
    coupleSprite.x = app.screen.width * 0.85;
    coupleSprite.y = app.screen.height * 0.9;
    coupleSprite.anchor.set(0.5, 0.5);
    coupleSprite.scale.set(0.4, 0.4);

    // Añadir la pareja al escenario
    app.stage.addChild(coupleSprite);

    // Configurar la conversación
    const conversation = [
        { personaje: 0, texto: "El arte abstracto es fascinante, ¿verdad?" },
        { personaje: 1, texto: "Sí, pero prefiero las pinturas clásicas." },
        { personaje: 0, texto: "Las técnicas clásicas tienen mucha base." },
        { personaje: 1, texto: "Eso es cierto, pero los colores del arte moderno cuentan historias." },
        { personaje: 0, texto: "Los colores muestran emociones, como en Kandinsky." },
        { personaje: 1, texto: "¡Exacto! Cada obra tiene su propio lenguaje." },
        { personaje: 0, texto: "Es difícil entender el arte abstracto al principio." },
        { personaje: 1, texto: "Es cierto, pero el arte clásico es más claro." },
        { personaje: 0, texto: "Las figuras clásicas tienen una armonía natural." },
        { personaje: 1, texto: "Sí, los retratos renacentistas son impresionantes." },
        { personaje: 0, texto: "Pero el arte abstracto tiene su propia perfección." },
        { personaje: 1, texto: "Es cierto. Ambos estilos pueden coexistir." },
        { personaje: 0, texto: "El arte busca siempre expresar la verdad humana." },
        { personaje: 1, texto: "El arte refleja la sociedad de cada época." },
        { personaje: 0, texto: "Lo que me gusta del arte abstracto es su libertad." },
        { personaje: 1, texto: "Para mí, las figuras claras son más directas." },
        { personaje: 0, texto: "A veces, lo que no se ve tiene más impacto." },
        { personaje: 1, texto: "Aún prefiero el arte con narrativas claras." },
        { personaje: 0, texto: "El arte abstracto te permite crear tu propia historia." },
        { personaje: 1, texto: "Es una perspectiva interesante." },
        { personaje: 0, texto: "El arte es subjetivo, lo que importa es cómo te conecta." },
        { personaje: 1, texto: "Es cierto, cada persona tiene una conexión diferente." },
        { personaje: 0, texto: "Eso es lo que hace al arte tan poderoso." },
        { personaje: 1, texto: "El arte nos mueve de una manera que las palabras no pueden." },
        { personaje: 0, texto: "Es un lenguaje universal." },
        { personaje: 1, texto: "Sí, nos conecta sin importar las barreras." },
        { personaje: 0, texto: "Eso es lo que hace al arte eterno." }
    ];


    let currentDialogue = 0; // Índice de conversación

    // Función para mostrar los diálogos
    async function showConversation() {
        const { personaje, texto } = conversation[currentDialogue];

        // Determina la posición del globo (izquierda o derecha)
        const xPos = personaje === 0 ? coupleSprite.x - 80 : coupleSprite.x + 80;
        const yPos = coupleSprite.y - 120;

        // Mostrar el diálogo
        await showDialog(texto, xPos, yPos);

        // Avanzar al siguiente diálogo
        currentDialogue = (currentDialogue + 1) % conversation.length; // Reiniciar si es necesario

        // Esperar un tiempo y continuar la conversación
        setTimeout(showConversation, 2000); // 3 segundos entre diálogos
    }

    // Inicia la conversación automáticamente
    showConversation();
}



async function showDialog(text, x, y) {
    const dialogContainer = new PIXI.Container();

    // Cargar la textura de la burbuja
    const bubbleTexture = await PIXI.Assets.load("./assets/burbuja.png");
    const bubbleSprite = new PIXI.Sprite(bubbleTexture);

    bubbleSprite.anchor.set(0.5, 1); // Ajustar el ancla para centrarlo encima
    bubbleSprite.scale.set(0.5, 0.5); // Escalar al tamaño adecuado

    // Crear el texto del cuadro de diálogo
    const dialogText = new PIXI.Text(text, {
        fontFamily: 'Arial',
        fontSize: 14,
        fill: 0x000000, // Color negro
        align: 'center',
        wordWrap: true,
        wordWrapWidth: 150, // Ajustar ancho del texto al ancho de la burbuja
    });

    dialogText.anchor.set(0.5, 1); // Centrar texto dentro de la burbuja
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
    }, 3000);
}

// Función para agregar el letrero que abre el modal
async function addLetrero() {
    const letreroTexture = await PIXI.Assets.load("./assets/letrero-blogs.png");
    const letreroSprite = new PIXI.Sprite(letreroTexture);

    letreroSprite.x = app.screen.width * 0.58; // Posición en X
    letreroSprite.y = app.screen.height * 0.85; // Posición en Y
    letreroSprite.anchor.set(0.5, 0.5);
    letreroSprite.scale.set(0.3, 0.3);

    letreroSprite.interactive = true;
    letreroSprite.buttonMode = true; // Cambiar el cursor al pasar sobre el letrero
    letreroSprite.cursor = "pointer";

    letreroSprite.on("pointerdown", () => {
        moveCharacterTo(letreroSprite.x, characterSprite.y); // Mover el personaje hacia el letrero
        setTimeout(() => {
            showCustomModal(); // Mostrar el modal después de 1 segundo
        }, 500);
    });

    app.stage.addChild(letreroSprite);
}


function showCustomModal() {
    // Crear el contenedor del modal
    const modalContainer = document.createElement("div");
    modalContainer.id = "blogs-modal";
    modalContainer.style.position = "fixed";
    modalContainer.style.top = "50%";
    modalContainer.style.left = "50%";
    modalContainer.style.transform = "translate(-50%, -50%)";
    modalContainer.style.width = "80%";
    modalContainer.style.height = "80%";
    modalContainer.style.backgroundColor = "white";
    modalContainer.style.border = "2px solid black";
    modalContainer.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
    modalContainer.style.display = "grid";
    modalContainer.style.gridTemplateColumns = "3fr 1fr";
    modalContainer.style.padding = "20px";
    modalContainer.style.zIndex = "1000";

    // Sección principal de blogs
    const mainSection = document.createElement("div");
    mainSection.style.display = "flex";
    mainSection.style.flexDirection = "column";
    mainSection.style.gap = "20px";

    const title = document.createElement("h2");
    title.textContent = "BLOGS DE LA COMUNIDAD";
    title.style.textAlign = "center";
    mainSection.appendChild(title);

    const blogsContainer = document.createElement("div");
    blogsContainer.id = "blogs-container";
    blogsContainer.style.display = "grid";
    blogsContainer.style.gridTemplateColumns = "repeat(2, 1fr)";
    blogsContainer.style.gap = "10px";

    // Blogs iniciales ficticios
    const blogs = [
        { title: "Cómo pintar con luz", author: "ArtGamerX", content: "El pintado con luz (light painting) es una técnica fotográfica en la que se utiliza una fuente de luz, como una linterna o una luz LED, para crear imágenes durante una exposición larga. Esta técnica captura el movimiento de la luz en la cámara, creando efectos impresionantes. Se puede experimentar con diferentes formas, colores y movimientos de la luz para crear composiciones artísticas." },
        { title: "Diseño de personajes estilo anime", author: "MangaMaster", content: "El diseño de personajes en el estilo anime se caracteriza por ojos grandes, expresiones emocionales exageradas y proporciones estilizadas. Es importante definir la personalidad del personaje primero, ya que esto influye en su vestimenta, postura y expresión facial. Los colores juegan un papel importante, desde tonos suaves hasta combinaciones llamativas para reflejar las emociones y el ambiente de la historia." },
        { title: "Arte en pixel: Lo retro está de moda", author: "PixelWizard", content: "El arte en pixel tiene sus raíces en los videojuegos de los años 80 y 90, y su estilo retro ha regresado con fuerza en la cultura digital moderna. Este tipo de arte utiliza una paleta de colores limitada y píxeles grandes para crear imágenes que evocan nostalgia. A menudo se utiliza en videojuegos, iconos, y obras de arte digital en plataformas como redes sociales y galerías en línea." },
        { title: "El arte del graffiti digital", author: "SprayKing", content: " El graffiti digital es una extensión del graffiti tradicional, pero en lugar de usar aerosoles sobre paredes, los artistas utilizan herramientas digitales como tabletas y software de diseño gráfico. Este tipo de arte puede estar inspirado en el grafiti urbano, con letras grandes, colores vibrantes y mensajes visuales impactantes. También puede fusionar técnicas de arte digital y tradicional, creando un estilo único en la web y en medios visuales." },
    ];

    blogs.forEach(blog => addBlogToContainer(blog, blogsContainer));

    mainSection.appendChild(blogsContainer);

    const createBlogButton = document.createElement("button");
    createBlogButton.textContent = "+ CREAR MI BLOG";
    createBlogButton.style.padding = "10px 20px";
    createBlogButton.style.fontSize = "16px";
    createBlogButton.style.cursor = "pointer";
    createBlogButton.onclick = () => showAddBlogModal(blogsContainer);
    mainSection.appendChild(createBlogButton);

    modalContainer.appendChild(mainSection);

    // Sección del usuario destacado
    const featuredUserSection = document.createElement("div");
    featuredUserSection.style.display = "flex";
    featuredUserSection.style.flexDirection = "column";
    featuredUserSection.style.alignItems = "center";
    featuredUserSection.style.justifyContent = "center";
    featuredUserSection.style.borderLeft = "1px solid black";
    featuredUserSection.style.padding = "10px";

    const rewardTitle = document.createElement("h3");
    rewardTitle.textContent = "REWARD";

    const userImage = document.createElement("img");
    userImage.src = "assets/imagen-lord.jpg"; // Ruta de la imagen en la carpeta 'assets'
    userImage.style.borderRadius = "50%";
    userImage.style.width = "200px"; // tamaño de la imagen
    userImage.style.height = "200px"; // tamaño de la imagen

    const userName = document.createElement("p");
    userName.textContent = "ART - LORD";
    userName.style.color = "red";

    const eventList = [
        "Arte Luminoso: Festival de Pintura con Luz",
        "Anime Creativo: Expo de Diseño de Personajes",
        "RetroPixel: Celebración del Arte Digital Retro",
        "Graffiti 2.0: Revolución Digital en las Calles Virtuales",
        "Conexiones Culturales: Encuentro Internacional de Arte Contemporáneo",
        "BlogArte: Festival de Blogs Creativos y Culturales",
        "Arte Digital al Día: Encuentro de Influencers y Creadores de Contenido"
    ];
    
    const userStats = document.createElement("p");
    userStats.textContent = "EVENTOS GANADOS:";
    
    // Crear una lista de eventos
    const eventListContainer = document.createElement("ul");
    eventList.forEach(event => {
        const eventItem = document.createElement("li");
        eventItem.textContent = event;
        eventListContainer.appendChild(eventItem);
    });
    
    featuredUserSection.appendChild(rewardTitle);
    featuredUserSection.appendChild(userImage);
    featuredUserSection.appendChild(userName);
    featuredUserSection.appendChild(userStats);
    featuredUserSection.appendChild(eventListContainer);
    
    modalContainer.appendChild(featuredUserSection);

    // Botón de cierre
    const closeButton = document.createElement("div");
    closeButton.textContent = "X";
    closeButton.style.position = "absolute";
    closeButton.style.top = "10px";
    closeButton.style.right = "10px";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontSize = "20px";
    closeButton.style.fontWeight = "bold";
    closeButton.onclick = () => {
        document.body.removeChild(modalContainer);
    };
    modalContainer.appendChild(closeButton);

    // Añadir el modal al documento
    document.body.appendChild(modalContainer);
}

function showAddBlogModal(blogsContainer) {
    const modalContainer = document.createElement("div");
    modalContainer.style.position = "fixed";
    modalContainer.style.top = "50%";
    modalContainer.style.left = "50%";
    modalContainer.style.transform = "translate(-50%, -50%)";
    modalContainer.style.width = "50%";
    modalContainer.style.backgroundColor = "white";
    modalContainer.style.border = "2px solid black";
    modalContainer.style.padding = "20px";
    modalContainer.style.zIndex = "1000";
    modalContainer.style.display = "flex";
    modalContainer.style.flexDirection = "column";
    modalContainer.style.gap = "10px";

    const titleInput = document.createElement("input");
    titleInput.placeholder = "Título del blog";
    titleInput.style.padding = "10px";

    const authorInput = document.createElement("input");
    authorInput.placeholder = "Autor (nick)";
    authorInput.style.padding = "10px";

    const contentInput = document.createElement("textarea");
    contentInput.placeholder = "Contenido del blog";
    contentInput.style.padding = "10px";
    contentInput.style.height = "100px";

    const submitButton = document.createElement("button");
    submitButton.textContent = "SUBIR BLOG";
    submitButton.style.padding = "10px 20px";
    submitButton.style.cursor = "pointer";
    submitButton.onclick = () => {
        const newBlog = {
            title: titleInput.value,
            author: authorInput.value,
            content: contentInput.value
        };
        addBlogToContainer(newBlog, blogsContainer);
        document.body.removeChild(modalContainer);
    };

    const closeButton = document.createElement("button");
    closeButton.textContent = "CERRAR";
    closeButton.style.padding = "10px 20px";
    closeButton.style.cursor = "pointer";
    closeButton.onclick = () => {
        document.body.removeChild(modalContainer);
    };

    modalContainer.appendChild(titleInput);
    modalContainer.appendChild(authorInput);
    modalContainer.appendChild(contentInput);
    modalContainer.appendChild(submitButton);
    modalContainer.appendChild(closeButton);

    document.body.appendChild(modalContainer);
}

function addBlogToContainer(blog, container) {
    const blogCard = document.createElement("div");
    blogCard.style.border = "1px solid black";
    blogCard.style.padding = "10px";
    blogCard.style.textAlign = "center";

    const blogTitle = document.createElement("h3");
    blogTitle.textContent = blog.title;

    const blogAuthor = document.createElement("p");
    blogAuthor.textContent = `Por: ${blog.author}`;

    const blogContent = document.createElement("p");
    blogContent.textContent = blog.content;

    blogCard.appendChild(blogTitle);
    blogCard.appendChild(blogAuthor);
    blogCard.appendChild(blogContent);
    container.appendChild(blogCard);
}



loadTaberna();