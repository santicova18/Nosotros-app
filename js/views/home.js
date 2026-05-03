// js/views/home.js
export function renderHome(container) {
  container.innerHTML = `
    <div class="container home-container">
      <h1>Para ti ❤️</h1>
      <p id="mensaje" class="mensaje-dinamico">Toca el botón...</p>
      <button id="btnAmor" class="btn-amor">💖</button>
    </div>
  `;

  const mensajes = [
    'mi vida ❤️',
    'eres hermosa 😍',
    'que guapa 😵',
    'te amo mucho 💖',
    'mi persona favorita 🥺',
    'mi todo 💕'
  ];

  const btn = container.querySelector('#btnAmor');
  const texto = container.querySelector('#mensaje');

  texto.style.transition = 'transform 0.2s';

  btn.onclick = () => {
    const random = Math.floor(Math.random() * mensajes.length);
    texto.textContent = mensajes[random];
    texto.style.transform = 'scale(1.2)';
    setTimeout(() => texto.style.transform = 'scale(1)', 200);
  };
}