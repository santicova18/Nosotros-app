// js/views/home.js
export class HomeView {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }
    
    async mostrar() {
        this.container.innerHTML = 
            <div class='container home-container'>
                <h1>Para ti ❤️</h1>
                <p id='mensaje' class='mensaje-dinamico'>Toca el botón...</p>
                <button id='btnAmor' class='btn-amor'>💖</button>
            </div>
        ;
        this.inicializarBotón();
    }
    
    ocultar() {
        this.container.innerHTML = '';
        return Promise.resolve();
    }
    
    inicializarBotón() {
        const mensajes = ['mi vida ❤️', 'eres hermosa 😍', 'que guapa 😵', 'te amo mucho 💖', 'mi persona favorita 🥺', 'mi todo 💕'];
        const btn = this.container.querySelector('#btnAmor');
        const texto = this.container.querySelector('#mensaje');
        
        if (btn && texto) {
            btn.addEventListener('click', () => {
                let random = Math.floor(Math.random() * mensajes.length);
                texto.textContent = mensajes[random];
                texto.style.transform = 'scale(1.2)';
                setTimeout(() => texto.style.transform = 'scale(1)', 200);
            });
        }
    }
}
