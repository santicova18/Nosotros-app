# Nosotros ✦

Una aplicación web íntima y minimalista diseñada como un espacio seguro para guardar recuerdos, fotos y momentos especiales compartidos. 

## ✨ Características

- **Diseño Minimalista**: Una interfaz limpia, moderna y enfocada en el contenido.
- **Single Page Application (SPA)**: Navegación fluida y rápida sin recargar la página.
- **Modo Oscuro Integrado**: Estilos cuidadosamente diseñados en modo oscuro para una experiencia visual relajante.
- **Gestión de Recuerdos**: Sube, visualiza y organiza tus fotos y anécdotas en una línea de tiempo (Timeline).
- **Botón "Sentir"**: Una función especial para enviar notificaciones cariñosas y recordar a tu persona especial que piensas en ella.

## 🚀 Tecnologías Utilizadas

- **Frontend**: HTML5, Vanilla JavaScript (ES6 Modules), CSS3 (Variables, Grid, Flexbox, Animaciones).
- **Arquitectura**: Componentes modulares, separación de vistas e inyección de dependencias simple.
- **Diseño**: Mobile-first, inspirado en la navegación de iOS con un dock inferior flotante.

## 📁 Estructura del Proyecto

```text
/
├── index.html           # Punto de entrada de la aplicación
├── README.md            # Este archivo
├── css/                 # Hojas de estilo modulares
│   ├── animations.css   # Animaciones y transiciones clave
│   ├── cards.css        # Estilos para tarjetas de recuerdos
│   ├── global.css       # Estilos globales y reset
│   ├── layout.css       # Estructura principal y contenedores
│   ├── navbar.css       # Barra de navegación flotante inferior
│   ├── subir.css        # Estilos de la vista de subida
│   ├── timeline.css     # Estilos de la vista de línea de tiempo
│   ├── variables.css    # Paleta de colores, tipografía y tokens de diseño
│   └── views.css        # Estilos específicos de otras vistas
└── js/                  # Lógica de la aplicación
    ├── main.js          # Inicialización y enrutador SPA
    └── views/           # Vistas de la aplicación
        ├── boton.js     # Vista del botón "Sentir"
        ├── home.js      # Vista de Inicio
        ├── subir.js     # Vista para añadir recuerdos
        └── timeline.js  # Vista de la línea de tiempo de recuerdos
```

## 🛠️ Instalación y Uso

1. Clona este repositorio en tu máquina local.
2. Abre el archivo `index.html` en tu navegador web. (Para una mejor experiencia, puedes usar un servidor local como Live Server en VSCode).
3. ¡Disfruta de tu espacio privado!

---
*Hecho con ❤️ para guardar nuestros mejores momentos.*
