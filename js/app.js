const mensajes = [
  "mi vida ❤️",
  "eres hermosa 😍",
  "que guapa 😵",
  "te amo mucho 💖",
  "mi persona favorita 🥺",
  "mi todo 💕"
];

const btn = document.getElementById("btnAmor");
const texto = document.getElementById("mensaje");

btn.addEventListener("click", () => {
  let random = Math.floor(Math.random() * mensajes.length);

  texto.textContent = mensajes[random];

  // animación
  texto.style.transform = "scale(1.2)";
  setTimeout(() => {
    texto.style.transform = "scale(1)";
  }, 200);
});