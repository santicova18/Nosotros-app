// js/views/boton.js
export function renderBoton(container) {
  const mensajes = [
    'yo también te extraño mucho',
    'cada día sin ti es difícil',
    'pienso en ti todo el tiempo',
    'no puedo esperar a verte',
    'te amo más cada día',
    'eres lo más bonito que tengo',
    'me faltas',
  ];

  container.innerHTML = `
    <div class="boton-view anim-blur-reveal">

      <!-- Orb decorativo -->
      <div class="boton-orb"></div>

      <!-- Contenido -->
      <div class="boton-content">
        <p class="boton-eyebrow">cuando la distancia pesa</p>
        <h2 class="boton-title" id="mensaje-boton">presiona si me extrañas</h2>
      </div>

      <!-- Botón -->
      <button class="btn-extranar" id="btnExtrañar" aria-label="Te extraño">
        <span class="btn-extranar__ring"></span>
        <span class="btn-extranar__icon">◡</span>
      </button>

      <p class="boton-hint">solo presiona y siente</p>

    </div>
  `;

  const btn   = container.querySelector('#btnExtrañar');
  const texto = container.querySelector('#mensaje-boton');
  let presionado = false;

  btn.onclick = () => {
    const random = Math.floor(Math.random() * mensajes.length);

    // Animación del texto
    texto.style.transition = 'opacity 180ms ease, transform 180ms ease';
    texto.style.opacity    = '0';
    texto.style.transform  = 'translateY(10px)';

    // Animación del botón
    btn.style.transform = 'scale(0.88)';

    setTimeout(() => {
      texto.textContent  = mensajes[random];
      texto.style.opacity   = '1';
      texto.style.transform = 'translateY(0)';
      btn.style.transform   = '';
    }, 190);

    // Añadir clase de pulso al primer toque
    if (!presionado) {
      presionado = true;
      btn.classList.add('pulsing');
    }
  };
}