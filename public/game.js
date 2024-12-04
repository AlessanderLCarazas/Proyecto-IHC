document.addEventListener('DOMContentLoaded', () => {
    // Crear la aplicación PixiJS
    const app = new PIXI.Application({
      width: window.innerWidth, // Ancho igual al de la ventana
      height: window.innerHeight, // Alto igual al de la ventana
      backgroundColor: 0x1099bb, // Color de fondo (azul claro)
    });
  
    // Agregar el canvas de Pixi al DOM
    document.body.appendChild(app.view);
  
    // Cargar la imagen y agregarla al escenario
    const imagePath = 'assets/map.jpg'; // Ruta a la imagen
    const texture = PIXI.Texture.from(imagePath);
    const sprite = new PIXI.Sprite(texture);
  
    // Ajustar posición y tamaño del sprite
    sprite.anchor.set(0.5); // Centrar el anclaje
    sprite.x = app.screen.width / 2; // Centrar en el eje X
    sprite.y = app.screen.height / 2; // Centrar en el eje Y
  
    // Escalar la imagen si es necesario
    sprite.width = app.screen.width * 0.8; // 80% del ancho de la pantalla
    sprite.height = app.screen.height * 0.8; // 80% del alto de la pantalla
  
    // Agregar el sprite al escenario
    app.stage.addChild(sprite);
  
    // Redimensionar la aplicación si la ventana cambia de tamaño
    window.addEventListener('resize', () => {
      app.renderer.resize(window.innerWidth, window.innerHeight);
      sprite.x = app.screen.width / 2;
      sprite.y = app.screen.height / 2;
      sprite.width = app.screen.width * 0.8;
      sprite.height = app.screen.height * 0.8;
    });
  });
  