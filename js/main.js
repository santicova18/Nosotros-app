// js/main.js
import './firebase.js';

import { renderTimeline } from './views/timeline.js';
import { renderSubir } from './views/subir.js';
import { renderHome } from './views/home.js';
import { renderBoton } from './views/boton.js';

class App {
    constructor() {
        this.vistaActual = null;
        this.contenedor = document.getElementById('app');
        
        this.inicializarNavegacion();
        this.cargarVistaPorDefecto();
    }
    
    inicializarNavegacion() {
        document.getElementById('nav-home').onclick = () => this.cambiarVista('home');
        document.getElementById('nav-timeline').onclick = () => this.cambiarVista('timeline');
        document.getElementById('nav-subir').onclick = () => this.cambiarVista('subir');
        document.getElementById('nav-boton').onclick = () => this.cambiarVista('boton');

        window.addEventListener('hashchange', () => {
            const vista = location.hash.substring(1) || 'home';
            this.cambiarVista(vista);
        });
    }
    
    async cargarVistaPorDefecto() {
        const vistaInicial = location.hash.substring(1) || 'home';
        await this.cambiarVista(vistaInicial);
    }
    
    async cambiarVista(nombreVista) {
        const vistasValidas = ['home', 'timeline', 'subir', 'boton'];

        if (!vistasValidas.includes(nombreVista)) {
            nombreVista = 'home';
        }

        if (this.vistaActual === nombreVista) return;

        // limpiar contenedor
        this.contenedor.innerHTML = '';

        switch(nombreVista) {
            case 'timeline':
                await renderTimeline(this.contenedor);
                break;
            case 'subir':
                await renderSubir(this.contenedor, this);
                break;
            case 'boton':
                await renderBoton(this.contenedor);
                break;
            case 'home':
                await renderHome(this.contenedor);
                break;
        }

        this.vistaActual = nombreVista;

        if (location.hash !== `#${nombreVista}`) {
            location.hash = nombreVista;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});