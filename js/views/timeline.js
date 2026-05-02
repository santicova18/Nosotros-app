import { obtenerRecuerdos } from "../services/recuerdosService.js";
import { Recuerdo } from "../models/recuerdo.js";

export async function renderTimeline(container) {
  try {
    const datos = await obtenerRecuerdos();

    // Convertimos a instancias del modelo (IMPORTANTE 🔥)
    const recuerdos = datos.map(d => new Recuerdo(d));

    // Render
    container.innerHTML = `
      <h2>Nuestros recuerdos ❤️</h2>
      <div class="timeline">
        ${recuerdos.map(r => `
          <div class="recuerdo">
            <h3>${r.titulo}</h3>
            <p>${r.descripcion}</p>

            ${r.imagenUrl ? `
              <img src="${r.imagenUrl}" class="recuerdo-img"/>
            ` : ""}

            <small>${formatearFecha(r.fecha)}</small>
          </div>
        `).join("")}
      </div>
    `;

  } catch (error) {
    console.error("Error cargando timeline:", error);
    container.innerHTML = `<p>Error cargando recuerdos 😢</p>`;
  }
}

// 🔥 Mejora visual simple
function formatearFecha(fecha) {
  if (!fecha) return "";

  const f = new Date(fecha);
  return f.toLocaleDateString();
}