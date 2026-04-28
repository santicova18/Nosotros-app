const btn = document.getElementById("btnExtrañar");
const estado = document.getElementById("estado");

// cargar último estado
let data = JSON.parse(localStorage.getItem("boton")) || null;

if (data) {
  actualizarMensaje(data.timestamp);
}

// cuando presionan
btn.addEventListener("click", () => {
  let nuevo = {
    timestamp: Date.now()
  };

  localStorage.setItem("boton", JSON.stringify(nuevo));

  actualizarMensaje(nuevo.timestamp);
});

// función para mostrar tiempo bonito
function actualizarMensaje(timestamp) {
  let ahora = Date.now();
  let diff = Math.floor((ahora - timestamp) / 1000);

  let texto = "";

  if (diff < 60) {
    texto = `Te extrañaron hace ${diff} segundos 🥺`;
  } else if (diff < 3600) {
    let min = Math.floor(diff / 60);
    texto = `Te extrañaron hace ${min} minutos 💕`;
  } else {
    let horas = Math.floor(diff / 3600);
    texto = `Te extrañaron hace ${horas} horas ❤️`;
  }

  estado.textContent = texto;
}