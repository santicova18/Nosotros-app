// js/views/timeline.js
import { obtenerRecuerdos, eliminarRecuerdo } from "../services/recuerdosServices.js";

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
  const counter = document.createElement('div');
  counter.className = 'timeline-counter-wrapper';
  counter.innerHTML = `<span class="timeline-counter">✦ ${recuerdos.length} recuerdo${recuerdos.length !== 1 ? 's' : ''}</span>`;
  container.appendChild(counter);

  // Grid con animación escalonada
  const grid = document.createElement('div');
  grid.className = 'timeline-grid anim-stagger';

  recuerdos.forEach(r => {
    const card = document.createElement('div');
    card.className = 'recuerdo-card';
    card.setAttribute('role', 'article');
    card.setAttribute('tabindex', '0');
    card.dataset.id = r.id;

    // Optimizar URL de Cloudinary: añadir transformaciones f_auto,q_auto
    const imgSrc = r.imagenUrl
      ? r.imagenUrl.replace('/upload/', '/upload/f_auto,q_auto,w_800/')
      : null;

    const imagenHtml = imgSrc
      ? `<div class="recuerdo-card__img-wrapper">
           <img class="recuerdo-card__img" src="${imgSrc}" alt="${r.titulo || 'Recuerdo'}" loading="lazy">
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
        <div class="recuerdo-card__actions">
          <button class="btn-eliminar" aria-label="Eliminar recuerdo" title="Eliminar">✕</button>
        </div>
      </div>
      <div class="recuerdo-card__confirm" hidden>
        <p>¿Eliminar este recuerdo?</p>
        <div class="confirm-btns">
          <button class="btn-confirmar-si">Sí, eliminar</button>
          <button class="btn-confirmar-no">Cancelar</button>
        </div>
      </div>
    `;

    // --- Lógica eliminar ---
    const btnEliminar  = card.querySelector('.btn-eliminar');
    const confirmPanel = card.querySelector('.recuerdo-card__confirm');
    const btnSi        = card.querySelector('.btn-confirmar-si');
    const btnNo        = card.querySelector('.btn-confirmar-no');

    // Mostrar panel de confirmación inline (sin bloquear la UI)
    btnEliminar.addEventListener('click', (e) => {
      e.stopPropagation();
      confirmPanel.hidden = false;
      card.classList.add('confirming');
    });

    // Cancelar
    btnNo.addEventListener('click', (e) => {
      e.stopPropagation();
      confirmPanel.hidden = true;
      card.classList.remove('confirming');
    });

    // Confirmar eliminación
    btnSi.addEventListener('click', async (e) => {
      e.stopPropagation();
      btnSi.disabled = true;
      btnSi.textContent = 'Eliminando...';

      try {
        await eliminarRecuerdo(r.id);

        // Animación de salida
        card.classList.add('removing');
        
        setTimeout(() => {
          card.remove();
          // Actualizar contador
          const restantes = grid.querySelectorAll('.recuerdo-card').length;
          const counterSpan = counter.querySelector('.timeline-counter');
          if (counterSpan) {
            counterSpan.textContent = `✦ ${restantes} recuerdo${restantes !== 1 ? 's' : ''}`;
          }

          // Si no quedan recuerdos, mostrar estado vacío
          if (restantes === 0) {
            counter.remove();
            grid.remove();
            container.insertAdjacentHTML('beforeend', `
              <div class="timeline-empty">
                <span class="empty-icon">◎</span>
                <h3>Aún no hay recuerdos</h3>
                <p>Añade vuestro primer momento especial</p>
              </div>
            `);
          }
        }, 350);

      } catch (err) {
        console.error("Error al eliminar recuerdo:", err);
        btnSi.disabled = false;
        btnSi.textContent = 'Sí, eliminar';
      }
    });

    // Abrir modal al hacer clic en la tarjeta (pero no en los botones)
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.btn-eliminar, .recuerdo-card__confirm')) {
        abrirModal(r);
      }
    });
    card.onkeydown = (e) => { if (e.key === 'Enter') abrirModal(r); };

    grid.appendChild(card);
  });

  container.appendChild(grid);
}

function abrirModal(r) {
  const modal    = document.getElementById('modal-recuerdo');
  const imgEl    = document.getElementById('modal-img');
  const tituloEl = document.getElementById('modal-titulo');
  const descEl   = document.getElementById('modal-desc');
  const fechaEl  = document.getElementById('modal-fecha');

  tituloEl.textContent = r.titulo || 'Sin título';
  descEl.textContent   = r.descripcion || '';
  fechaEl.textContent  = formatearFecha(r.fecha);

  if (r.imagenUrl) {
    // En el modal mostramos la imagen en mayor resolución
    imgEl.src = r.imagenUrl.replace('/upload/', '/upload/f_auto,q_auto,w_1200/');
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

