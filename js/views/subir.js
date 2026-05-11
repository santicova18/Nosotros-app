// js/views/subir.js
import { guardarRecuerdo } from "../services/recuerdosServices.js";

export async function renderSubir(container, app) {
  container.innerHTML = `
    <div class="subir-view">

      <!-- Header -->
      <div class="subir-header anim-slide-down">
        <h2>Nuevo recuerdo</h2>
        <p class="subtitle">guarda un momento especial</p>
      </div>

      <!-- Formulario -->
      <div class="subir-card">

        <div class="field-group">
          <label class="field-label" for="titulo">Título</label>
          <input
            id="titulo"
            type="text"
            placeholder="Dale un nombre a este recuerdo..."
            autocomplete="off"
            maxlength="80"
          >
        </div>

        <div class="field-group">
          <label class="field-label" for="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            placeholder="Cuéntame cómo fue ese momento..."
            rows="4"
          ></textarea>
        </div>

        <div class="field-group">
          <label class="field-label" for="imagenUrl">Imagen (URL)</label>
          <input
            id="imagenUrl"
            type="url"
            placeholder="https://..."
            autocomplete="off"
          >
          <p class="field-hint">Pega el link de una imagen para añadir una foto al recuerdo</p>
        </div>

        <!-- Preview de imagen -->
        <div class="img-preview-wrapper" id="preview-wrapper">
          <div class="img-preview-placeholder" id="preview-placeholder">
            <div class="placeholder-icon">◎</div>
            <p>La imagen aparecerá aquí</p>
          </div>
          <img id="preview" src="" alt="Vista previa">
        </div>

        <!-- Botón guardar -->
        <button id="guardar" class="btn-guardar">
          Guardar recuerdo
        </button>

        <!-- Estado -->
        <div id="estado" role="status" aria-live="polite"></div>

      </div>
    </div>
  `;

  const inputUrl       = container.querySelector('#imagenUrl');
  const preview        = container.querySelector('#preview');
  const previewWrapper = container.querySelector('#preview-wrapper');
  const previewPlaceholder = container.querySelector('#preview-placeholder');
  const btnGuardar     = container.querySelector('#guardar');
  const estado         = container.querySelector('#estado');

  // Preview de imagen en tiempo real
  inputUrl.addEventListener('input', () => {
    const url = inputUrl.value.trim();
    if (url) {
      preview.src = url;
      preview.style.display = 'block';
      previewPlaceholder.style.display = 'none';
      previewWrapper.classList.add('has-image');
    } else {
      preview.style.display = 'none';
      preview.src = '';
      previewPlaceholder.style.display = '';
      previewWrapper.classList.remove('has-image');
    }
  });

  // Función para mostrar estado
  const mostrarEstado = (msg, tipo) => {
    estado.textContent = msg;
    estado.className = `visible ${tipo}`;
    if (tipo === 'exito') {
      setTimeout(() => {
        estado.className = '';
        estado.textContent = '';
      }, 3000);
    }
  };

  // Guardar recuerdo
  btnGuardar.onclick = async () => {
    const titulo      = container.querySelector('#titulo').value.trim();
    const descripcion = container.querySelector('#descripcion').value.trim();
    const imagenUrl   = inputUrl.value.trim();

    if (!titulo) {
      mostrarEstado('Por favor escribe un título para el recuerdo.', 'error');
      container.querySelector('#titulo').focus();
      return;
    }

    btnGuardar.disabled = true;
    mostrarEstado('Guardando tu recuerdo...', 'cargando');

    try {
      await guardarRecuerdo({
        titulo,
        descripcion,
        imagenUrl,
        fecha: new Date().toISOString()
      });

      mostrarEstado('¡Recuerdo guardado con éxito! ✦', 'exito');

      // Regresar al timeline después de un momento
      setTimeout(() => {
        app.cambiarVista('timeline');
        app._actualizarNavActivo('timeline');
        const navTimeline = document.getElementById('nav-timeline');
        if (navTimeline) {
          document.querySelectorAll('nav.menu .nav-item').forEach(b => b.classList.remove('active'));
          navTimeline.classList.add('active');
        }
      }, 1200);

    } catch (err) {
      mostrarEstado('Hubo un error al guardar. Inténtalo de nuevo.', 'error');
      btnGuardar.disabled = false;
    }
  };
}