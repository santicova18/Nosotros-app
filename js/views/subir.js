// js/views/subir.js
import { firebaseService } from '../firebase.js';
import { Recuerdo } from '../models/recuerdo.js';

export class SubirView {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }
    
    async mostrar() {
        this.container.innerHTML = 
            <div class='subir-container'>
                <h1>Agregar Recuerdo ❤️</h1>
                <input type='file' id='imagen' accept='image/*'><br><br>
                <input type='text' id='texto' placeholder='Escribe algo bonito...'><br><br>
                <input type='date' id='fecha' value=''><br><br>
                <button id='guardar' class='btn-guardar'>Guardar</button>
                <div id='estado'></div>
            </div>
        ;
        this.inicializarFormulario();
    }
    
    ocultar() {
        this.container.innerHTML = '';
        return Promise.resolve();
    }
    
    inicializarFormulario() {
        const guardarBtn = this.container.querySelector('#guardar');
        const estadoDiv = this.container.querySelector('#estado');
        
        guardarBtn.addEventListener('click', async () => {
            estadoDiv.textContent = 'Guardando...';
            estadoDiv.className = 'estado cargando';
            try {
                const texto = this.container.querySelector('#texto').value;
                const fecha = this.container.querySelector('#fecha').value;
                const imagenInput = this.container.querySelector('#imagen');
                
                let imagenUrl = '';
                if (imagenInput.files[0]) {
                    imagenUrl = await firebaseService.subirImagen(imagenInput.files[0]);
                }
                
                const recuerdo = new Recuerdo({ texto, imagenUrl, fecha });
                await firebaseService.agregarRecuerdo(recuerdo.toFirebaseObject());
                
                estadoDiv.textContent = '¡Guardado!';
                estadoDiv.className = 'estado exito';
                this.container.querySelector('#texto').value = '';
                imagenInput.value = '';
                setTimeout(() => {
                    estadoDiv.textContent = '';
                    estadoDiv.className = 'estado';
                }, 2000);
            } catch (error) {
                estadoDiv.textContent = 'Error: ' + error.message;
                estadoDiv.className = 'estado error';
            }
        });
    }
}
