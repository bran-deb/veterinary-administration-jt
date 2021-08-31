import { eliminarCita, cargarEdicion } from '../funciones.js'
import { contenedorCitas } from '../selectores.js'


class UI {
    imprimirAlertas(mensaje, tipo) {
        const divMensaje = document.createElement('div')
        divMensaje.textContent = mensaje
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12')
        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger')
        } else {
            divMensaje.classList.add('alert-success')
        }
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'))
        setTimeout(() => {
            divMensaje.remove()
        }, 2000);
    }
    //usamos destructuring para sacar el array de citas desde los parametros
    imprimirCitas({ citas }) {
        this.limpiarHTML()

        citas.forEach(cita => {
            const { id, mascota, propietario, telefono, fecha, hora, sintomas } = cita
            const divCita = document.createElement('div')
            divCita.classList.add('cita', 'p-3')
            divCita.dataset.id = id

            const mascotaParrafo = document.createElement('h2')
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder')
            mascotaParrafo.textContent = mascota

            const propietarioParrafo = document.createElement('p')
            propietarioParrafo.innerHTML = `
            <span class="font-weight-bolder">Propietario:</span> ${propietario}
            `
            const telefonoParrafo = document.createElement('p')
            telefonoParrafo.innerHTML = `
            <span class="font-weight-bolder">Telefono:</span> ${telefono}
            `
            const fehaParrafo = document.createElement('p')
            fehaParrafo.innerHTML = `
            <span class="font-weight-bolder">Feha:</span> ${fecha}
            `
            const horaParrafo = document.createElement('p')
            horaParrafo.innerHTML = `
            <span class="font-weight-bolder">Hora:</span> ${hora}
            `
            const sintomasParrafo = document.createElement('p')
            sintomasParrafo.innerHTML = `
            <span class="font-weight-bolder">Sintomas:</span> ${sintomas}
            `
            //boton para eliminar
            const btnEliminar = document.createElement('button')
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2')
            btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>`
            btnEliminar.onclick = () => eliminarCita(id)
            // boton para editar
            const btnEditar = document.createElement('button')
            btnEditar.classList.add('btn', 'btn-info')
            btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
          </svg>`
            btnEditar.onclick = () => cargarEdicion(cita)

            divCita.appendChild(mascotaParrafo)
            divCita.appendChild(propietarioParrafo)
            divCita.appendChild(telefonoParrafo)
            divCita.appendChild(fehaParrafo)
            divCita.appendChild(horaParrafo)
            divCita.appendChild(sintomasParrafo)
            divCita.appendChild(btnEliminar)
            divCita.appendChild(btnEditar)

            contenedorCitas.appendChild(divCita)
        })
    }
    limpiarHTML() {
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
    }
}

export default UI