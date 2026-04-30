// js/models/recuerdo.js
export class Recuerdo {
    constructor({ id, texto, imagenUrl, fecha }) {
        this.id = id || null;
        this.texto = texto || '';
        this.imagenUrl = imagenUrl || '';
        this.fecha = fecha || new Date().toISOString().split('T')[0];
    }
    
    // Métodos de validación
    esValido() {
        return this.texto.trim() !== '' || this.imagenUrl !== '';
    }
    
    // Convertir a objeto para Firebase
    toFirebaseObject() {
        return {
            texto: this.texto,
            imagenUrl: this.imagenUrl,
            fecha: this.fecha
        };
    }
    
    // Crear instancia desde objeto de Firebase
    static fromFirebase(doc) {
        const data = doc.data();
        return new Recuerdo({
            id: doc.id,
            texto: data.texto,
            imagenUrl: data.imagenUrl,
            fecha: data.fecha
        });
    }
}
