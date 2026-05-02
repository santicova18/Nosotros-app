// js/main.js
import './firebase.js'; // Inicializar Firebase
import { TimelineView } from './views/timeline.js';
import { HomeView } from './views/home.js';
import { SubirView } from './views/subir.js';
import { BotonView } from './views/boton.js';

class App {
    constructor() {
        this.vistas = {
            'home': null,
            'timeline': null,
            'subir': null,
            'boton': null
        };
        this.vistaActual = null;
        this.contenedor = document.getElementById('app');
        
        this.inicializarNavegacion();
        this.cargarVistaPorDefecto();
    }
    
    inicializarNavegacion() {
        const navHome = document.getElementById('nav-home');
        const navTimeline = document.getElementById('nav-timeline');
        const navSubir = document.getElementById('nav-subir');
        const navBoton = document.getElementById('nav-boton');

        if (!navHome || !navTimeline || !navSubir || !navBoton) {
            console.warn('Faltan elementos de navegación');
            return;
        }

        navHome.onclick = () => this.cambiarVista('home');
        navTimeline.onclick = () => this.cambiarVista('timeline');
        navSubir.onclick = () => this.cambiarVista('subir');
        navBoton.onclick = () => this.cambiarVista('boton');
            // Navegación con hash
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
        if (!vistasValidas.includes(nombreVista)){
            console.warn(`Vista desconocida: ${nombreVista}. Redirigiendo a home.`);
            nombreVista = 'home';
        }
        if (this.vistaActual === nombreVista) return;
        // Ocultar vista actual
        if (this.vistaActual && this.vistas[this.vistaActual] && this.vistas[this.vistaActual].ocultar) {
            await this.vistas[this.vistaActual].ocultar();
        }
        
 
        if (!this.vistas[nombreVista]) {
            switch(nombreVista) {
                case 'timeline':
                    this.vistas[nombreVista] = new TimelineView('app');
                    break;
                case 'subir':
                    this.vistas[nombreVista] = new SubirView('app');
                    break;
                case 'boton':
                    this.vistas[nombreVista] = new BotonView('app');
                    break;
                case 'home':
                    this.vistas[nombreVista] = new HomeView('app');
                    break;
                default:
                    this.vistas[nombreVista] = { mostrar: () => Promise.resolve(), ocultar: () => Promise.resolve() };
            }
        }
        
        // Mostrar nueva vista
        await this.vistas[nombreVista].mostrar();
        this.vistaActual = nombreVista;
        if (location.hash !== `#${nombreVista}`) {
            location.hash = nombreVista;
        }
        location.hash = nombreVista;
    }
}

// Iniciar app cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
