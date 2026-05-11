// js/views/timeline.js
import { obtenerRecuerdos } from "../services/recuerdosServices.js";

export async function renderTimeline(container) {

  // Estado de carga
  container.innerHTML = `
    <div class="timeline-header anim-slide-down">
      <h2>Recuerdos</h2>
      <p class="subtitle">nuestros momentos</p>
    </div>
    <div class="timeline-loading">
      <div class="timeline-loading-spinner"></div>
      <span>Cargando recuerdos...</span>
    </div>
  `;

  let recuerdos = [];
  try {
    recuerdos = await obtenerRecuerdos();
  } catch (e) {
    container.innerHTML += `<p style="text-align:center;color:var(--text-muted);font-size:var(--text-sm);">Error al cargar los recuerdos.</p>`;
    return;
  }

  // Eliminar spinner
  const spinner = container.querySelector('.timeline-loading');
  if (spinner) spinner.remove();

  if (recuerdos.length === 0) {
    container.insertAdjacentHTML('beforeend', `
      <div class="timeline-empty">
        <span class="empty-icon">◎</span>
        <h3>Aún no hay recuerdos</h3>
        <p>Añade vuestro primer momento especial</p>
      </div>
    `);
    return;
  }

  // Counter
  container.insertAdjacentHTML('beforeend', `
    <div style="text-align:center;margin-bottom:var(--space-md);">
      <span class="timeline-counter">✦ ${recuerdos.length} recuerdo${recuerdos.length !== 1 ? 's' : ''}</span>
    </div>
  `);

  // Grid con animación escalonada
  const grid = document.createElement('div');
  grid.className = 'timeline-grid anim-stagger';

  recuerdos.forEach(r => {
    const card = document.createElement('div');
    card.className = 'recuerdo-card';
    card.setAttribute('role', 'article');
    card.setAttribute('tabindex', '0');

    const imagenHtml = r.imagenUrl
      ? `<div class="recuerdo-card__img-wrapper">
           <img class="recuerdo-card__img" src="${r.imagenUrl}" alt="${r.titulo || 'Recuerdo'}" loading="lazy">
         </div>`
      : `<div class="recuerdo-card__img-wrapper">
           <div class="recuerdo-card__img-placeholder">◎</div>
         </div>`;

    card.innerHTML = `
      ${imagenHtml}
      <div class="recuerdo-card__body">
        <h3 class="recuerdo-card__title">${r.titulo || 'Sin título'}</h3>
        <p class="recuerdo-card__desc">${r.descripcion || ''}</p>
      </div>
      <div class="recuerdo-card__footer">
        <span class="recuerdo-card__fecha">${formatearFecha(r.fecha)}</span>
        <span class="recuerdo-card__icon">✦</span>
      </div>
    `;

    // Abrir modal al hacer clic
    card.onclick = () => abrirModal(r);
    card.onkeydown = (e) => { if (e.key === 'Enter') abrirModal(r); };

    grid.appendChild(card);
  });

  container.appendChild(grid);
}

function abrirModal(r) {
  const modal   = document.getElementById('modal-recuerdo');
  const imgEl   = document.getElementById('modal-img');
  const tituloEl = document.getElementById('modal-titulo');
  const descEl  = document.getElementById('modal-desc');
  const fechaEl = document.getElementById('modal-fecha');

  tituloEl.textContent = r.titulo || 'Sin título';
  descEl.textContent   = r.descripcion || '';
  fechaEl.textContent  = formatearFecha(r.fecha);

  if (r.imagenUrl) {
    imgEl.src = r.imagenUrl;
    imgEl.alt = r.titulo || 'Recuerdo';
    imgEl.style.display = 'block';
  } else {
    imgEl.style.display = 'none';
  }

  modal.classList.add('visible');
}

function formatearFecha(fecha) {
  if (!fecha) return '';
  return new Date(fecha).toLocaleDateString('es-ES', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
}