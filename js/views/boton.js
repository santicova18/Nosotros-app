// js/views/boton.js
export function renderBoton(container) {
  container.innerHTML = `
    <div class="container">
      <h1>Te extraño mucho ❤️</h1>
      <p id="mensaje-boton">Presiona el botón...</p>
      <button id="btnExtrañar">💔</button>
    </div>
  `;

  const mensajes = [
    'Yo también te extraño mucho 💔',
    'Cada día sin ti es difícil 😢',
    'Pienso en ti todo el tiempo 💭',
    'No puedo esperar a verte 🤗',
    'Te amo más cada día ❤️'
  ];

  const btn = container.querySelector('#btnExtrañar');
  const texto = container.querySelector('#mensaje-boton');

  texto.style.transition = 'transform 0.2s';

  btn.onclick = () => {
    const random = Math.floor(Math.random() * mensajes.length);
    texto.textContent = mensajes[random];
    texto.style.transform = 'scale(1.2)';
    setTimeout(() => texto.style.transform = 'scale(1)', 200);
  };
}