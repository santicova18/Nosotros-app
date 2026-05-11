const MAX_SIZE_PX  = 1200; // ancho/alto máximo en píxeles
const WEBP_QUALITY = 0.82; // calidad WebP (0–1)

/**
 * Comprime una imagen usando Canvas antes de subirla.
 * Redimensiona a MAX_SIZE_PX manteniendo proporción y convierte a WebP.
 * @param {File} file - Archivo original del input type="file"
 * @returns {Promise<Blob>} - Blob comprimido listo para subir
 */
function comprimirImagen(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl); // liberar memoria

      let { width, height } = img;

      // Calcular nuevas dimensiones manteniendo proporción
      if (width > MAX_SIZE_PX || height > MAX_SIZE_PX) {
        if (width > height) {
          height = Math.round((height * MAX_SIZE_PX) / width);
          width  = MAX_SIZE_PX;
        } else {
          width  = Math.round((width * MAX_SIZE_PX) / height);
          height = MAX_SIZE_PX;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width  = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => blob ? resolve(blob) : reject(new Error('Error al comprimir la imagen')),
        'image/webp',
        WEBP_QUALITY
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('No se pudo leer la imagen'));
    };

    img.src = objectUrl;
  });
}

/**
 * Comprime y sube una imagen a Cloudinary.
 * @param {File} file - Archivo original del input type="file"
 * @returns {Promise<string>} - URL segura de la imagen subida
 */
export async function subirImagen(file) {
  // 1. Comprimir antes de subir
  const blob = await comprimirImagen(file);

  // 2. Construir el FormData con el blob comprimido
  const formData = new FormData();
  formData.append("file", blob, "recuerdo.webp");
  formData.append("upload_preset", "recuerdos_upload");

  // 3. Subir a Cloudinary
  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dtyu3s25t/image/upload",
    { method: "POST", body: formData }
  );

  if (!response.ok) {
    throw new Error(`Error Cloudinary: ${response.status}`);
  }

  const data = await response.json();
  return data.secure_url;
}