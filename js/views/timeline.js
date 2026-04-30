// js/views/timeline.js
import { firebaseService } from '../firebase.js';
import { Recuerdo } from '../models/recuerdo.js';

export class TimelineView {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.recuerdos = [];
        this.modal = null;
    }
    
    async mostrar() {
        this.container.innerHTML = '<h2>Nuestra Historia ❤️</h2><div id=\"timeline-list\" class=\"timeline\"></div>';
        await this.cargarRecuerdos();
    }
    
    async cargarRecuerdos() {
        try {
            const datos = await firebaseService.obtenerRecuerdos();
            this.recuerdos = datos.map(d => new Recuerdo({ id: d.id, texto: d.texto, imagenUrl: d.imagenUrl, fecha: d.fecha }));
            this.renderLista();
        } catch (error) {
            console.error('Error cargando recuerdos:', error);
        }
    }
    
    renderLista() {
        const lista = this.container.querySelector('#timeline-list');
        if (!lista) return;
        lista.innerHTML = this.recuerdos.map(r => '<div>' + r.texto + '</div>').join('');
    }
}
