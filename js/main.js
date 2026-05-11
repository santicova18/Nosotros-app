// js/main.js
import './firebase.js';

import { renderTimeline } from './views/timeline.js';
import { renderSubir }    from './views/subir.js';
import { renderHome }     from './views/home.js';
import { renderBoton }    from './views/boton.js';

class App {
    constructor() {
        this.vistaActual = null;
        this.contenedor  = document.getElementById('app');

        this.inicializarNavegacion();
        this.cargarVistaPorDefecto();
    }

    inicializarNavegacion() {
        const navItems = document.querySelectorAll('nav.menu .nav-item');

        const bindNav = (id, vista) => {
            document.getElementById(id).onclick = () => {
                this.cambiarVista(vista);
                // Actualizar ítem activo
                navItems.forEach(btn => btn.classList.remove('active'));
                document.getElementById(id).classList.add('active');
            };
        };

        bindNav('nav-home',     'home');
        bindNav('nav-timeline', 'timeline');
        bindNav('nav-subir',    'subir');
        bindNav('nav-boton',    'boton');

        // Gestión del modal global
        document.getElementById('modal-cerrar').onclick = () => {
            document.getElementById('modal-recuerdo').classList.remove('visible');
        };
        document.getElementById('modal-recuerdo').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                e.currentTarget.classList.remove('visible');
            }
        });

        // Hash routing
        window.addEventListener('hashchange', () => {
            const vista = location.hash.substring(1) || 'home';
            this.cambiarVista(vista);
            this._actualizarNavActivo(vista);
        });
    }

    _actualizarNavActivo(vista) {
        const mapaIds = {
            home:     'nav-home',
            timeline: 'nav-timeline',
            subir:    'nav-subir',
            boton:    'nav-boton'
        };
        document.querySelectorAll('nav.menu .nav-item').forEach(btn => btn.classList.remove('active'));
        const activeId = mapaIds[vista];
        if (activeId) document.getElementById(activeId)?.classList.add('active');
    }

    async cargarVistaPorDefecto() {
        const vistaInicial = location.hash.substring(1) || 'home';
        this._actualizarNavActivo(vistaInicial);
        await this.cambiarVista(vistaInicial);
    }

    async cambiarVista(nombreVista) {
        const vistasValidas = ['home', 'timeline', 'subir', 'boton'];

        if (!vistasValidas.includes(nombreVista)) nombreVista = 'home';
        if (this.vistaActual === nombreVista) return;

        // Transición de salida
        this.contenedor.style.opacity = '0';
        this.contenedor.style.transform = 'translateY(8px)';
        this.contenedor.style.transition = 'opacity 160ms ease, transform 160ms ease';

        await new Promise(r => setTimeout(r, 160));

        this.contenedor.innerHTML = '';

        switch (nombreVista) {
            case 'timeline': await renderTimeline(this.contenedor); break;
            case 'subir':    await renderSubir(this.contenedor, this); break;
            case 'boton':    await renderBoton(this.contenedor); break;
            case 'home':     await renderHome(this.contenedor); break;
        }

        // Transición de entrada
        this.contenedor.style.opacity = '1';
        this.contenedor.style.transform = 'translateY(0)';

        this.vistaActual = nombreVista;

        if (location.hash !== `#${nombreVista}`) {
            location.hash = nombreVista;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});