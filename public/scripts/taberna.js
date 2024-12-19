import { initializePixiApplication, loadCharacter, moveCharacterTo, loadSomething } from "./shared.js";

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

  // Crear cuadro semitransparente
  const transparentBox = new PIXI.Graphics();
  transparentBox.beginFill(0x000000, 0.1); // Color negro con opacidad 0.3
  transparentBox.drawRect(2150, 69, 250, 420); // Tamaño y posición
  transparentBox.endFill();

  transparentBox.interactive = true;
  transparentBox.buttonMode = true;

  // Cambiar el cursor cuando pase el mouse sobre el cuadro
  transparentBox.on("pointerover", () => {
    app.view.style.cursor = "pointer"; // Cambiar a la manita
  });

  transparentBox.on("pointerout", () => {
    app.view.style.cursor = "default"; // Volver al cursor normal
  });

  // Evento de clic
  transparentBox.on("pointerdown", () => {
    console.log("Cuadro clickeado");
    showCustomModal(); 
  });

  app.stage.addChild(transparentBox);


  // Cargar el personaje
  characterSprite = await loadCharacter(100, 100, 0.4, 0.4);

  


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

// Función para añadir el LoreMaster
async function addLoreMaster() {
    const LoreMasterTexture = await PIXI.Assets.load("./assets/CHARACTER22NAME.png");
    const LoreMasterSprite = new PIXI.Sprite(LoreMasterTexture);

    LoreMasterSprite.x = app.screen.width * 0.4; // Posición en X
    LoreMasterSprite.y = app.screen.height * 0.55; // Posición en Y
    LoreMasterSprite.anchor.set(0.5, 0.5);
    LoreMasterSprite.scale.set(2, 2);

    app.stage.addChild(LoreMasterSprite);

}

// Función para añadir el Grunt
async function addGrunt() {
    const GruntTexture = await PIXI.Assets.load("./assets/CHARACTER12NAME.png");
    const GruntSprite = new PIXI.Sprite(GruntTexture);

    GruntSprite.x = app.screen.width * 0.1; // Posición en X
    GruntSprite.y = app.screen.height * 0.55; // Posición en Y
    GruntSprite.anchor.set(0.5, 0.5);
    GruntSprite.scale.set(2, 2);

    app.stage.addChild(GruntSprite);

}

// Función para añadir el newbie2
async function addnewbie2() {
  const newbie2Texture = await PIXI.Assets.load("./assets/newbie2NAME.png");
  const newbie2Sprite = new PIXI.Sprite(newbie2Texture);

  newbie2Sprite.x = app.screen.width * 0.6; // Posición en X
  newbie2Sprite.y = app.screen.height * 0.65; // Posición en Y
  newbie2Sprite.anchor.set(0.5, 0.5);
  newbie2Sprite.scale.set(1.3, 1.3);

  app.stage.addChild(newbie2Sprite);

}

// Función para añadir el antenita2
async function addantenita2() {
  const antenita2Texture = await PIXI.Assets.load("./assets/antenita2NAME.png");
  const antenita2Sprite = new PIXI.Sprite(antenita2Texture);

  antenita2Sprite.x = app.screen.width * 0.8; // Posición en X
  antenita2Sprite.y = app.screen.height * 0.67; // Posición en Y
  antenita2Sprite.anchor.set(0.5, 0.5);
  antenita2Sprite.scale.set(1.3, 1.3);

  app.stage.addChild(antenita2Sprite);

}

// Función para añadir el GUILDMASTER
async function addGUILDMASTER() {
  const GUILDMASTERTexture = await PIXI.Assets.load("./assets/GUILDMASTER.png");
  const GUILDMASTERSprite = new PIXI.Sprite(GUILDMASTERTexture);

  GUILDMASTERSprite.x = app.screen.width * 0.7; // Posición en X
  GUILDMASTERSprite.y = app.screen.height * 0.3; // Posición en Y
  GUILDMASTERSprite.anchor.set(0.5, 0.5);
  GUILDMASTERSprite.scale.set(1.4, 1.4);

  app.stage.addChild(GUILDMASTERSprite);

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
  modalContainer.style.maxWidth = "900px";
  modalContainer.style.height = "80%";
  modalContainer.style.backgroundColor = "#F4E1C1"; // Color marrón claro
  modalContainer.style.border = "4px solid #8B4513"; // Borde marrón oscuro
  modalContainer.style.borderRadius = "15px";
  modalContainer.style.boxShadow = "0px 8px 15px rgba(0, 0, 0, 0.3)";
  modalContainer.style.overflow = "hidden";
  modalContainer.style.display = "flex";
  modalContainer.style.flexDirection = "column";
  modalContainer.style.padding = "20px";
  modalContainer.style.zIndex = "1000";
  modalContainer.style.opacity = "0";
  modalContainer.style.transition = "opacity 0.3s ease-in-out";

  // Fondo artístico
  modalContainer.style.backgroundImage = "url('https://www.transparenttextures.com/patterns/corkboard.png')";
  modalContainer.style.backgroundSize = "cover";
  modalContainer.style.backgroundPosition = "center";
  modalContainer.style.color = "black";

  setTimeout(() => {
    modalContainer.style.opacity = "1";
  }, 10); // Animación de entrada

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
    {
      title: "Cómo Pintar con Luz: Un Tutorial Paso a Paso",
      author: "ArtGamerX",
      content: "Descubre cómo crear impresionantes imágenes utilizando la técnica de pintar con luz. Este tutorial te guiará paso a paso para que empieces a experimentar con esta forma de arte fotográfico.",
      fullContent: `La técnica de pintar con luz, también conocida como 'Light Painting' en inglés, es una forma de arte fotográfico que consiste en usar fuentes de luz como pinceles para crear imágenes. Este tipo de fotografía se captura en una cámara con una exposición prolongada, lo que permite que las trayectorias de las luces sean registradas en la imagen. Es una técnica creativa y divertida que ofrece resultados asombrosos. Aquí te presentamos un tutorial para que puedas empezar a experimentar con esta técnica.
    
    Materiales Necesarios:
    1. Cámara DSLR o cámara con modo manual: Necesitarás una cámara que permita ajustar la velocidad de obturación y la apertura.
    2. Trípode: Esencial para mantener la cámara fija durante la exposición prolongada.
    3. Linterna, LED, o cualquier fuente de luz: Puedes usar luces de colores, luces de navidad, flashlights, o incluso luces de tu teléfono móvil.
    4. Entorno oscuro: Elige un lugar sin luz ambiental para obtener los mejores resultados.
    5. Obturador remoto (opcional): Para evitar el movimiento de la cámara al tomar la foto.
    
    Paso 1: Preparar el Equipo
    - Coloca la cámara en un trípode para mantenerla fija durante toda la exposición.
    - Asegúrate de que la cámara esté configurada en modo manual.
    - Ajusta el enfoque de la cámara en un objeto distante o en un punto de referencia fijo para evitar que la imagen se vea borrosa.
    
    Paso 2: Configurar la Cámara
    1. Velocidad de obturación: Ajusta la cámara para usar una velocidad de obturación larga (al menos 10 segundos, pero puede ser más dependiendo de la cantidad de luz que desees capturar).
    2. Apertura (f-stop): Usa una apertura pequeña (un número f alto como f/8 o f/11) para asegurarte de que la imagen esté completamente enfocada. Esto también permitirá que entre menos luz, lo que es ideal para exposiciones largas.
    3. ISO: Mantén el ISO bajo (por ejemplo, ISO 100 o 200) para evitar que la foto se vea demasiado ruidosa.
    4. Enfoque manual: Si tu cámara lo permite, cambia al enfoque manual para evitar que el enfoque automático intente ajustar durante la exposición.
    
    Paso 3: Escoge un Entorno Oscuro
    Es importante que estés en un lugar lo suficientemente oscuro para que las luces que estás utilizando sean las únicas que se vean en la fotografía. Esto evitará que se sobrecargue la imagen con luz ambiental no deseada.
    
    Paso 4: Crear el Arte con Luz
    1. Prueba de luz: Antes de empezar con la fotografía, prueba diferentes tipos de luces. Puedes usar linternas, LEDs de colores, o incluso luces de navidad. Asegúrate de que la luz sea brillante y visible en la oscuridad.
    2. Mueve las luces: Durante la exposición prolongada, mueve las fuentes de luz de la manera que desees. Puedes dibujar formas, escribir palabras, o crear patrones abstractos en el aire. La clave está en mover las luces de manera fluida y constante, ya que cualquier interrupción en el movimiento puede hacer que la imagen se vea desordenada.
    3. Usa diferentes técnicas: Experimenta con diferentes movimientos de la luz. Algunas ideas incluyen:
    - Dibujar figuras geométricas: Como círculos, espirales o líneas rectas.
    - Escribir palabras: Si tienes una fuente de luz con un color diferente, puedes escribir palabras o frases en el aire.
    - Crea efectos abstractos: Juega con el movimiento de luces rápidas o lentas para crear formas fluidas.
    
    Paso 5: Tomar la Foto
    - Presiona el obturador o usa un disparador remoto para iniciar la exposición.
    - Mientras la cámara captura la imagen, mueve las fuentes de luz de la forma que desees.
    - Al final de la exposición, la cámara registrará todo el movimiento de la luz y aparecerá en la foto como si estuvieras pintando con luz.
    
    Paso 6: Revisión y Ajustes
    - Revisa la foto en la pantalla de la cámara.
    - Si no estás satisfecho con el resultado, ajusta la exposición (más tiempo o menos), la apertura o la intensidad de las luces y vuelve a intentarlo.
    
    Consejos Adicionales:
    - Experimenta con diferentes colores: Si tienes luces de colores, juega con ellas para agregar más dinamismo a tus imágenes.
    - Usa varios tipos de fuentes de luz: Puedes combinar diferentes luces, como luces LED, linternas, o incluso luces móviles de tus teléfonos.
    - Añade elementos de movimiento: Si tienes a alguien que te ayude, puedes integrar el movimiento humano con las luces para agregar un toque especial.
    - Prueba en exteriores: Si el clima lo permite, puedes hacer Light Painting en lugares al aire libre, como bosques o parques, y aprovechar el cielo estrellado o las luces de la ciudad para agregar ambiente.
    
    Conclusión
    Pintar con luz es una forma artística que permite a los fotógrafos crear imágenes asombrosas sin la necesidad de herramientas complicadas. Con solo una cámara, una fuente de luz y algo de práctica, puedes crear fotos llenas de magia y creatividad. Recuerda, ¡la clave está en la experimentación y la paciencia!`
    },
    
    {
      title: "Diseño de personajes estilo anime",
      author: "MangaMaster",
      content: "El diseño de personajes estilo anime requiere atención al detalle...",
      fullContent: "El diseño de personajes estilo anime es un arte que combina creatividad, técnica y expresión. Los personajes anime se caracterizan por tener grandes ojos expresivos, rostros estilizados y cuerpos con proporciones particulares, como cabezas grandes y cuerpos delgados. Para crear un personaje memorable, es fundamental definir su personalidad, lo cual influye directamente en su apariencia.\n\n"
        + "1. **Rasgos faciales**: Los ojos en el anime son el centro de la expresión emocional. Se pueden utilizar diferentes tamaños, formas y colores de ojos para reflejar características como la bondad, la tristeza o la agresividad. La forma de la cara también juega un papel importante, desde rostros redondeados hasta formas más angulares que reflejan personalidad y estado emocional.\n\n"
        + "2. **Peinado y vestuario**: El peinado es otro aspecto clave en el diseño de personajes de anime. Los personajes suelen tener peinados exagerados, con colores vibrantes y formas distintivas. El vestuario debe reflejar el rol del personaje dentro de la historia, ya sea un guerrero, un mago o un estudiante. La elección de ropa puede dar pistas sobre la personalidad y el trasfondo cultural del personaje.\n\n"
        + "3. **Postura y gestos**: La postura de un personaje también es crucial para comunicar su carácter. Un personaje confiado puede tener una postura erguida, mientras que uno más tímido podría adoptar una postura encorvada. Los gestos y las expresiones faciales son fundamentales para mostrar emociones de manera clara.\n\n"
        + "4. **Color y detalles**: Los colores juegan un papel muy importante en el anime. Los personajes pueden tener un esquema de colores que refleje su naturaleza, como colores cálidos para personajes amigables o colores fríos para personajes misteriosos. Además, los detalles como tatuajes, cicatrices o accesorios pueden añadir profundidad a la historia del personaje.\n\n"
        + "5. **Estilos de línea**: El tipo de líneas que se utilizan en el diseño también varía. Las líneas finas y detalladas son típicas en estilos más suaves y románticos, mientras que las líneas gruesas y agresivas se pueden ver en personajes más intensos o poderosos. Estas diferencias ayudan a transmitir las emociones y características del personaje sin necesidad de palabras."
    },
    
    {
      title: "Arte en pixel: Lo retro está de moda",
      author: "PixelWizard",
      content: "El arte en pixel revive la nostalgia de los videojuegos clásicos...",
      fullContent: "El arte en pixel es una forma única y nostálgica de expresión visual que ha ganado popularidad en la era digital, especialmente con la resurgencia de lo retro. Este estilo se inspira en los videojuegos clásicos de 8 bits y 16 bits, donde cada píxel cuenta debido a las limitaciones tecnológicas de la época. Hoy en día, el arte en pixel combina la simplicidad con la creatividad, creando impresionantes obras de arte a partir de pequeños bloques de color.\n\n"
        + "1. **La base del arte en pixel**: La pixelación es el proceso de crear imágenes usando una cuadrícula de píxeles, donde cada píxel es un elemento básico que forma una imagen más grande. Aunque el arte en pixel puede parecer simple, requiere una gran precisión en la colocación de cada píxel para lograr detalles y profundidad en la imagen.\n\n"
        + "2. **Paletas limitadas**: Un aspecto distintivo del arte en pixel es el uso de paletas de colores limitadas. Esto hace que el proceso de diseño sea más desafiante pero también más creativo, ya que los artistas deben trabajar con una cantidad reducida de colores para transmitir la atmósfera, los detalles y las emociones del proyecto. Muchas veces, los artistas de pixel art crean paletas específicas para cada pieza, basadas en la época o el estilo que buscan recrear.\n\n"
        + "3. **Animación en pixel art**: Una de las características más atractivas del arte en pixel es la creación de animaciones. Las animaciones en pixel son simples pero expresivas, utilizando la técnica de animación cuadro por cuadro. Cada cuadro de la animación es una imagen individual, y el desafío es mantener la fluidez del movimiento mientras se respeta el estilo pixelado. Las animaciones de caminar, correr o saltar son comunes y requieren mucho trabajo para darles un toque realista dentro de las limitaciones del estilo.\n\n"
        + "4. **El resurgimiento en la cultura moderna**: Aunque el arte en pixel se originó en los primeros días de los videojuegos, ha resurgido con fuerza en los últimos años. Muchos videojuegos modernos adoptan este estilo para rendir homenaje a los clásicos y crear una estética retro que atrae tanto a nuevas generaciones como a quienes crecieron con estos juegos. Además, el arte en pixel no solo se limita a los videojuegos; ahora se ve en redes sociales, arte digital, y merchandising.\n\n"
        + "5. **Cómo crear arte en pixel**: Si quieres iniciarte en el arte en pixel, es importante familiarizarse con las herramientas disponibles. Hay programas como Aseprite o Piskel que permiten trabajar fácilmente en pixel art. Comienza con una cuadrícula pequeña, usa colores sencillos y trabaja en detalles pequeños. La práctica es fundamental, y poco a poco podrás crear piezas más complejas y animaciones fluidas."
    },
    
    {
      title: "El arte del graffiti digital",
      author: "SprayKing",
      content: "El graffiti digital es una forma de expresión moderna...",
      fullContent: "El graffiti digital es una evolución del arte callejero tradicional, llevando el concepto de 'arte en las paredes' al ámbito digital. Este estilo combina las técnicas del graffiti urbano, como el uso de aerosoles y plantillas, con las herramientas digitales que ofrecen tabletas gráficas y software especializado, abriendo un nuevo mundo de posibilidades para los artistas. A través de la tecnología, los artistas pueden explorar nuevas texturas, colores, y efectos visuales que no son posibles en las superficies físicas.\n\n"
        + "1. **Raíces en el graffiti tradicional**: El graffiti digital tiene sus raíces en las calles, donde comenzó como una forma de protesta y autoexpresión. Con el tiempo, se transformó en una forma de arte popular que busca embellecer y transformar los espacios urbanos. Los artistas que practican graffiti digital suelen inspirarse en los mismos elementos visuales que caracterizan al graffiti tradicional, como las letras estilizadas, los colores vibrantes y las formas abstractas.\n\n"
        + "2. **Herramientas digitales**: Para crear graffiti digital, los artistas utilizan tabletas gráficas como las de Wacom o XP-Pen, que permiten dibujar con precisión y controlar el trazo. Además, emplean software especializado como Adobe Photoshop, Procreate, o Krita, que les ofrecen una amplia gama de herramientas para simular la pintura con aerosol, crear capas, y trabajar con efectos de luz y sombra. Estas herramientas permiten una mayor libertad en la creación de arte, sin los límites físicos del graffiti tradicional.\n\n"
        + "3. **Técnicas y estilos**: Aunque el graffiti digital se basa en el graffiti tradicional, los artistas tienen la capacidad de experimentar con nuevas técnicas. Pueden crear texturas que imitan las superficies de la calle, como paredes rugosas o metálicas, o utilizar efectos visuales avanzados como neones, gradientes y reflejos. El graffiti digital también puede integrar elementos de otras formas de arte, como el diseño gráfico y el arte conceptual, lo que amplía las posibilidades del estilo.\n\n"
        + "4. **Expansión del graffiti digital**: Con el auge de las redes sociales y las plataformas de arte en línea, el graffiti digital ha ganado popularidad en todo el mundo. Artistas como Banksy, aunque conocidos por su trabajo en las calles, también han experimentado con el arte digital, llevando sus mensajes y su estilo a audiencias globales a través de medios digitales. Además, muchos artistas de graffiti digital ahora crean murales virtuales en entornos como videojuegos o plataformas de realidad aumentada.\n\n"
        + "5. **El futuro del graffiti digital**: El graffiti digital sigue evolucionando y se espera que continúe cruzando fronteras entre lo físico y lo digital. Los avances en la realidad virtual (VR) y la realidad aumentada (AR) están permitiendo a los artistas crear experiencias inmersivas que combinan el graffiti con entornos 3D, lo que promete llevar esta forma de arte a nuevas y emocionantes direcciones. Además, el graffiti digital ha demostrado ser un medio poderoso para expresar opiniones sociales y políticas, un aspecto clave que comparte con el graffiti urbano.\n\n"
        + "6. **Cómo empezar con el graffiti digital**: Si te interesa probar el graffiti digital, comienza con una tableta gráfica básica y un software de edición de imágenes. No es necesario tener experiencia previa, pero es útil estudiar las técnicas del graffiti tradicional, como el uso de la tipografía, el juego con el espacio y las formas, y la experimentación con colores. A medida que vayas aprendiendo, podrás desarrollar tu propio estilo y explorar nuevas formas de expresión artística."
    },
    
  ];

  blogs.forEach(blog => addBlogToContainer(blog, blogsContainer));

  mainSection.appendChild(blogsContainer);

  const createBlogButton = document.createElement("button");
  createBlogButton.textContent = "+ CREAR MI BLOG";
  createBlogButton.style.padding = "10px 20px";
  createBlogButton.style.fontSize = "16px";
  createBlogButton.style.cursor = "pointer";
  createBlogButton.style.backgroundColor = "#007BFF";
  createBlogButton.style.color = "white";
  createBlogButton.style.border = "none";
  createBlogButton.style.borderRadius = "5px";
  createBlogButton.style.transition = "background-color 0.3s";
  createBlogButton.onmouseover = () => (createBlogButton.style.backgroundColor = "#0056b3");
  createBlogButton.onmouseout = () => (createBlogButton.style.backgroundColor = "#007BFF");
  createBlogButton.onclick = () => showAddBlogModal(blogsContainer);
  mainSection.appendChild(createBlogButton);

  modalContainer.appendChild(mainSection);

  // Botón de cierre
  const closeButton = document.createElement("div");
  closeButton.textContent = "X";
  closeButton.style.position = "absolute";
  closeButton.style.top = "10px";
  closeButton.style.right = "10px";
  closeButton.style.cursor = "pointer";
  closeButton.style.fontSize = "20px";
  closeButton.style.fontWeight = "bold";
  closeButton.style.color = "white";
  closeButton.onclick = () => document.body.removeChild(modalContainer);
  modalContainer.appendChild(closeButton);

  // Cerrar con tecla ESC
  document.addEventListener("keydown", function escKeyListener(e) {
    if (e.key === "Escape") {
      document.body.removeChild(modalContainer);
      document.removeEventListener("keydown", escKeyListener);
    }
  });

  document.body.appendChild(modalContainer);
}

function addBlogToContainer(blog, container) {
  const blogCard = document.createElement("div");
  blogCard.style.border = "1px solid #ddd";
  blogCard.style.borderRadius = "10px";
  blogCard.style.padding = "15px";
  blogCard.style.backgroundColor = "#f9f9f9";
  blogCard.style.color = "black";
  blogCard.style.cursor = "pointer";
  blogCard.style.transition = "transform 0.2s, box-shadow 0.2s";
  blogCard.onmouseover = () => {
    blogCard.style.transform = "scale(1.05)";
    blogCard.style.boxShadow = "0px 6px 10px rgba(0, 0, 0, 0.2)";
  };
  blogCard.onmouseout = () => {
    blogCard.style.transform = "scale(1)";
    blogCard.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
  };
  blogCard.onclick = () => showFullBlogModal(blog);

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

function showFullBlogModal(blog) {
  const fullBlogModal = document.createElement("div");
  fullBlogModal.style.position = "fixed";
  fullBlogModal.style.top = "50%";
  fullBlogModal.style.left = "50%";
  fullBlogModal.style.transform = "translate(-50%, -50%)";
  fullBlogModal.style.width = "50%"; // Ancho reducido
  fullBlogModal.style.height = "80%"; // Altura aumentada
  fullBlogModal.style.backgroundColor = "white";
  fullBlogModal.style.borderRadius = "10px";
  fullBlogModal.style.boxShadow = "0px 8px 15px rgba(0, 0, 0, 0.2)";
  fullBlogModal.style.padding = "30px"; // Más padding para que el contenido no quede tan pegado
  fullBlogModal.style.zIndex = "1200";
  fullBlogModal.style.overflowY = "auto"; // Permitir scroll si el contenido es largo
  fullBlogModal.style.color = "black";
  fullBlogModal.style.fontFamily = "'Arial', sans-serif"; // Mejor legibilidad

  // Título del blog con tamaño de fuente grande
  const fullBlogTitle = document.createElement("h2");
  fullBlogTitle.textContent = blog.title;
  fullBlogTitle.style.fontSize = "2.5em"; // Tamaño de letra grande

  // Autor del blog
  const fullBlogAuthor = document.createElement("p");
  fullBlogAuthor.textContent = `Por: ${blog.author}`;
  fullBlogAuthor.style.fontSize = "1.2em"; // Tamaño de letra un poco mayor para el autor

  // Fecha del blog
  const fullBlogDate = document.createElement("p");
  fullBlogDate.textContent = `Fecha: ${blog.date}`;
  fullBlogDate.style.fontSize = "1.2em"; // También para la fecha

  // Contenido completo del blog
  const fullBlogContent = document.createElement("div");
  fullBlogContent.innerHTML = blog.fullContent; // Suponiendo que el contenido puede ser más largo (con HTML)
  fullBlogContent.style.fontSize = "1.5em"; // Letra más grande para el contenido
  fullBlogContent.style.lineHeight = "1.6"; // Espaciado de línea para mejor legibilidad

  // Imagen del blog si es que existe
  if (blog.image) {
    const blogImage = document.createElement("img");
    blogImage.src = blog.image;
    blogImage.style.maxWidth = "100%"; // Asegurarse de que la imagen no sobrepase el tamaño del modal
    blogImage.style.borderRadius = "10px";
    fullBlogContent.insertBefore(blogImage, fullBlogContent.firstChild);
  }

  // Botón para cerrar el modal
  const closeButton = document.createElement("div");
  closeButton.textContent = "Cerrar";
  closeButton.style.cursor = "pointer";
  closeButton.style.padding = "15px 30px";
  closeButton.style.marginTop = "20px";
  closeButton.style.backgroundColor = "#FF4C4C";
  closeButton.style.color = "white";
  closeButton.style.textAlign = "center";
  closeButton.style.borderRadius = "5px";
  closeButton.style.fontSize = "1.2em";
  closeButton.onclick = () => document.body.removeChild(fullBlogModal);

  // Agregar los elementos al modal
  fullBlogModal.appendChild(fullBlogTitle);
  fullBlogModal.appendChild(fullBlogAuthor);
  fullBlogModal.appendChild(fullBlogDate);
  fullBlogModal.appendChild(fullBlogContent);
  fullBlogModal.appendChild(closeButton);

  // Mostrar el modal en el cuerpo del documento
  document.body.appendChild(fullBlogModal);
}


function showAddBlogModal(blogsContainer) {
  const modalContainer = document.createElement("div");
  modalContainer.style.position = "fixed";
  modalContainer.style.top = "50%";
  modalContainer.style.left = "50%";
  modalContainer.style.transform = "translate(-50%, -50%)";
  modalContainer.style.width = "50%";
  modalContainer.style.backgroundColor = "#F4E1C1"; // Color marrón claro
  modalContainer.style.border = "4px solid #8B4513"; // Borde marrón oscuro
  modalContainer.style.padding = "20px";
  modalContainer.style.zIndex = "1000";
  modalContainer.style.display = "flex";
  modalContainer.style.flexDirection = "column";
  modalContainer.style.gap = "10px";

  const title = document.createElement("h2");
  title.textContent = "Crear Nuevo Blog";
  modalContainer.appendChild(title);

  const blogTitleInput = document.createElement("input");
  blogTitleInput.placeholder = "Título del Blog";
  blogTitleInput.style.padding = "10px";
  modalContainer.appendChild(blogTitleInput);

  const blogContentInput = document.createElement("textarea");
  blogContentInput.placeholder = "Contenido del Blog";
  blogContentInput.style.padding = "10px";
  modalContainer.appendChild(blogContentInput);

  const saveButton = document.createElement("button");
  saveButton.textContent = "Guardar Blog";
  saveButton.onclick = () => {
    const newBlog = {
      title: blogTitleInput.value,
      author: "Autor Desconocido",
      content: blogContentInput.value.slice(0, 100) + "...",
      fullContent: blogContentInput.value
    };
    addBlogToContainer(newBlog, blogsContainer);
    document.body.removeChild(modalContainer);
  };
  saveButton.style.padding = "10px 20px";
  saveButton.style.backgroundColor = "#28A745";
  saveButton.style.color = "white";
  saveButton.style.border = "none";
  saveButton.style.borderRadius = "5px";
  modalContainer.appendChild(saveButton);

  const closeButton = document.createElement("div");
  closeButton.textContent = "Cerrar";
  closeButton.onclick = () => document.body.removeChild(modalContainer);
  closeButton.style.padding = "10px 20px";
  closeButton.style.backgroundColor = "#FF4C4C";
  closeButton.style.color = "white";
  closeButton.style.textAlign = "center";
  closeButton.style.borderRadius = "5px";
  modalContainer.appendChild(closeButton);

  document.body.appendChild(modalContainer);
}

// Llama a la función `showCustomModal` cuando sea necesario



loadTaberna();