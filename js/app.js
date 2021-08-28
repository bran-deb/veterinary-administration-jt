////select inputs
const mascotaInput = document.querySelector('#mascota')
const propietarioInput = document.querySelector('#propietario')
const telefonoInput = document.querySelector('#telefono')
const fechaInput = document.querySelector('#fecha')
const horaInput = document.querySelector('#hora')
const sintomasInput = document.querySelector('#sintomas')
//select formulario
const formulario = document.querySelector('#nueva-cita')
//select contenedor resultado
const contenedorCitas = document.querySelector('#citas')

let editando

//registrar eventos
evntListener()
function evntListener() {
    mascotaInput.addEventListener('input', datosCita)
    propietarioInput.addEventListener('input', datosCita)
    telefonoInput.addEventListener('input', datosCita)
    fechaInput.addEventListener('input', datosCita)
    horaInput.addEventListener('input', datosCita)
    sintomasInput.addEventListener('input', datosCita)

    formulario.addEventListener('submit', nuevaCita)
}

//clases
class Citas {
    constructor() {
        this.citas = []
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita]
    }
    eliminarCita(id) {
        this.citas = this.citas.filter(cita => cita.id !== id)
    }
    editarCita(citaActualizada) {
        this.citas = this.citas.map(cita => citaActualizada.id === citaActualizada.id ? citaActualizada : cita)
    }

}
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

//Instancias
const ui = new UI()
const administarCitas = new Citas()



//Objects
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    hora: '',
    fecha: '',
    sintomas: ''
}

//agrega datos de cita
function datosCita(e) {
    //para evitar llenar el objeto uno por uno
    //obtenemos el nombre del evento con .name
    citaObj[e.target.name] = e.target.value
}

//valida y agrega ua nueva cita a la clase de citas
function nuevaCita(e) {
    e.preventDefault()
    //extraer informacion del ojeto de cita
    const { mascota, propietario, telefono, hora, fecha, sintomas } = citaObj
    // validar
    if ((mascota && propietario && telefono && hora && fecha && sintomas) === '') {
        ui.imprimirAlertas('Todos los campos son Obligatorios', 'error')
        return
    }
    if (editando) {
        ui.imprimirAlertas('Se adito correctamente')

        //pasar el objeto de la cita a edicion
        administarCitas.editarCita({ ...citaObj })
        //regresar el boton al estado original
        formulario.querySelector('button[type="submit"]').textContent = 'crear Cambios'
        // quitar modo edicion
        editando = false
    } else {
        //generar un id
        citaObj.id = Date.now()
        //crea nueva cita usando unaa copia de citaObj
        administarCitas.agregarCita({ ...citaObj })
        //mensaje de agregado correctamente
        ui.imprimirAlertas('Se agrego correctamente')
    }

    // reiniciamos objeto para la validacion
    reiniciarObj()
    // reiniciamos formulario
    formulario.reset()

    //mostrarHTML
    ui.imprimirCitas(administarCitas)
}

function reiniciarObj() {
    citaObj.mascota = '',
        citaObj.propietario = '',
        citaObj.telefono = '',
        citaObj.hora = '',
        citaObj.fecha = '',
        citaObj.sintomas = ''
}

function eliminarCita(id) {
    // eliminar la cita
    administarCitas.eliminarCita(id)
    //muestre un mensaje
    ui.imprimirAlertas('Mensaje eliminado')
    //refrescar las citas
    ui.imprimirCitas(administarCitas)
}

//carga los datos y el modo edicion
function cargarEdicion(cita) {
    const { id, mascota, propietario, telefono, hora, fecha, sintomas } = cita
    //llenar inputs
    mascotaInput.value = mascota
    propietarioInput.value = propietario
    telefonoInput.value = telefono
    hora.value = hora
    fechaInput.value = fecha
    sintomasInput.value = sintomas

    //llenar el objeto de citaObj
    citaObj.mascota = mascota
    citaObj.propietario = propietario
    citaObj.telefono = telefono
    citaObj.hora = hora
    citaObj.fecha = fecha
    citaObj.sintomas = sintomas
    citaObj.id = id

    //cambiar texto de boton
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios'

    editando = true
}