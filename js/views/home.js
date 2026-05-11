// js/views/home.js
export function renderHome(container) {
  const mensajes = [
    'mi vida',
    'eres hermosa',
    'que guapa',
    'te amo mucho',
    'mi persona favorita',
    'mi todo',
    'mi calma favorita',
    'mi lugar seguro',
  ];

  container.innerHTML = `
    <div class="home-view anim-blur-reveal">

      <!-- Header -->
      <div class="home-hero">
        <div class="home-orb"></div>
        <p class="home-eyebrow">para ti</p>
        <h1 class="home-title" id="mensaje">toca el corazón...</h1>
        <p class="home-subtitle">cada vez que extrañes algo lindo</p>
      </div>

      <!-- Botón principal -->
      <div class="home-action">
        <button id="btnAmor" class="btn-heart" aria-label="Mostrar mensaje">
          <span class="btn-heart__icon">✦</span>
        </button>
        <p class="home-hint">toca suavemente</p>
      </div>

      <!-- Tarjeta de fecha -->
      <div class="home-date-card card">
        <div class="home-date-card__inner">
          <span class="home-date-card__label">hoy es</span>
          <span class="home-date-card__date" id="home-fecha"></span>
        </div>
        <span class="home-date-card__icon">◎</span>
      </div>

    </div>
  `;

  // Mostrar fecha actual
  const fechaEl = container.querySelector('#home-fecha');
  if (fechaEl) {
    const hoy = new Date();
    fechaEl.textContent = hoy.toLocaleDateString('es-ES', {
      weekday: 'long', day: 'numeric', month: 'long'
    });
  }

  // Interacción del botón
  const btn  = container.querySelector('#btnAmor');
  const texto = container.querySelector('#mensaje');

  btn.onclick = () => {
    const random = Math.floor(Math.random() * mensajes.length);

    // Animación de salida
    texto.style.transition = 'opacity 150ms ease, transform 150ms ease';
    texto.style.opacity = '0';
    texto.style.transform = 'translateY(8px)';

    setTimeout(() => {
      texto.textContent = mensajes[random];
      texto.style.opacity = '1';
      texto.style.transform = 'translateY(0)';
    }, 160);

    // Pulso en el botón
    btn.style.transform = 'scale(0.90)';
    setTimeout(() => (btn.style.transform = ''), 180);
  };
}