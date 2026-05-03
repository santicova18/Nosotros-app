// js/models/recuerdo.js
 class Recuerdo {
    constructor({ id, titulo, descripcion, imagenUrl, fecha }) {
        this.id = id || null;
        this.titulo = titulo || '';
        this.descripcion = descripcion || '';
        this.imagenUrl = imagenUrl || '';
        this.fecha = fecha || new Date().toISOString().split('T')[0];
    }
    
    // Validación
    esValido() {
        return this.titulo.trim() !== '' || this.descripcion.trim() !== '' || this.imagenUrl !== '';
    }
    
    // Convertir a Firebase
    toFirebaseObject() {
        return {
            titulo: this.titulo,
            descripcion: this.descripcion,
            imagenUrl: this.imagenUrl,
            fecha: this.fecha
        };
    }
    
    // Crear desde Firebase
    static fromFirebase(doc) {
        const data = doc.data();
        return new Recuerdo({
            id: doc.id,
            titulo: data.titulo,
            descripcion: data.descripcion,
            imagenUrl: data.imagenUrl,
            fecha: data.fecha
        });
    }
}

export default Recuerdo;