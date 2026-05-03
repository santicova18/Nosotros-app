// js/views/timeline.js
import { obtenerRecuerdos } from "../services/recuerdosServices.js";

export async function renderTimeline(container) {
  const recuerdos = await obtenerRecuerdos();

  container.innerHTML = `
    <h2>Nuestros recuerdos ❤️</h2>
    <div class="timeline">
      ${recuerdos.map(r => `
        <div class="recuerdo">
          <h3>${r.titulo || ''}</h3>
          <p>${r.descripcion || ''}</p>

          ${r.imagenUrl ? `<img src="${r.imagenUrl}" width="200"/>` : ""}

          <small>${formatearFecha(r.fecha)}</small>
        </div>
      `).join("")}
    </div>
  `;
}

function formatearFecha(fecha) {
  if (!fecha) return '';
  return new Date(fecha).toLocaleDateString();
}