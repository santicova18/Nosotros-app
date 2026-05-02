import Recuerdo from "../models/recuerdo.js";
import { guardarRecuerdo } from "../services/recuerdosService.js";

export function renderSubir(container, app) {
  container.innerHTML = `
    <h2>Subir recuerdo</h2>
    <input id="titulo" placeholder="Título">
    <textarea id="descripcion"></textarea>
    <input id="imagenUrl" placeholder="URL de imagen">
    <button id="guardar">Guardar</button>
  `;

  document.getElementById("guardar").onclick = async () => {
const recuerdo = new Recuerdo({
  titulo: document.getElementById("titulo").value,
  descripcion: document.getElementById("descripcion").value,
  imagenUrl: document.getElementById("imagenUrl").value,
  fecha: new Date().toISOString()
});

if (!recuerdo.esValido()) {
  alert("Agrega al menos texto o imagen");
  return;
}

await guardarRecuerdo(recuerdo.toFirebaseObject());

    app.cambiarVista("timeline");
  };
}