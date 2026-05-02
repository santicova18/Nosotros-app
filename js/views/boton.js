// js/views/boton.js
export class BotonView {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }
    
    async mostrar() {
        this.container.innerHTML = `
            <div class='container'>
                <h1>Te extraño ❤️</h1>
                <p id='mensaje-boton' class='mensaje-dinamico'>Presiona el botón...</p>
                <button id='btnExtrañar' class='btn-extrañar'>💔</button>
            </div>
        `;
        this.inicializarBoton();
    }
    
    ocultar() {
        this.container.innerHTML = '';
        return Promise.resolve();
    }
    
    inicializarBoton() {
        const mensajes = [
            'Yo también te extraño mucho 💔',
            'Cada día sin ti es difícil 😢',
            'Pienso en ti todo el tiempo 💭',
            'No puedo esperar a verte 🤗',
            'Te amo más cada día ❤️',
            'Mi corazón está contigo 💕'
        ];
        
        const btn = this.container.querySelector('#btnExtrañar');
        const texto = this.container.querySelector('#mensaje-boton');
        
        if (btn && texto) {
            texto.style.transition = 'transform 0.2s';

            btn.onclick = () => {
                let random = Math.floor(Math.random() * mensajes.length);
                texto.textContent = mensajes[random];
                texto.style.transform = 'scale(1.2)';
                
                setTimeout(() => {
                    texto.style.transform = 'scale(1)';
                }, 200);
            };
        }
    }
}