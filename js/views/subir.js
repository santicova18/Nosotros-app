// js/views/subir.js
import { guardarRecuerdo } from "../services/recuerdosServices.js";

export async function renderSubir(container, app) {
  container.innerHTML = `
    <h2>Subir recuerdo</h2>
    <input id="titulo" placeholder="Título"><br><br>
    <textarea id="descripcion" placeholder="Pon una descripcion..."></textarea><br><br>
    <input type="imagenURL"  placeholder="Añade tu recuerdito 💘" ><br><br>

    <img id="preview" src="" style="display:none; max-width:200px; border-radius:10px;"><br><br>
    <button id="guardar">Guardar</button>
  `;

  const inputUrl = container.querySelector('#imagenUrl');
const preview = container.querySelector('#preview');

inputUrl.addEventListener('input', () => {
  const url = inputUrl.value;

  if (url) {
    preview.src = url;
    preview.style.display = 'block';
  } else {
    preview.style.display = 'none';
  }
});
  const btn = container.querySelector('#guardar');

  btn.onclick = async () => {
    const recuerdo = {
      titulo: container.querySelector('#titulo').value,
      descripcion: container.querySelector('#descripcion').value,
      imagenUrl: container.querySelector('#imagenUrl').value,
      fecha: new Date().toISOString()
    };

    await guardarRecuerdo(recuerdo);

    // 🔥 vuelve al timeline
    app.cambiarVista('timeline');
  };
}