import Citas from "./clases/Citas.js"
import UI from "./clases/UI.js"
import {
    mascotaInput,
    propietarioInput,
    telefonoInput,
    fechaInput,
    horaInput,
    sintomasInput,
    formulario
} from './selectores.js'
//Instancias
const ui = new UI()
const administarCitas = new Citas()


let editando

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
export function datosCita(e) {
    //para evitar llenar el objeto uno por uno
    //obtenemos el nombre del evento con .name
    citaObj[e.target.name] = e.target.value
}

//valida y agrega ua nueva cita a la clase de citas
export function nuevaCita(e) {
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

export function reiniciarObj() {
    citaObj.mascota = '',
        citaObj.propietario = '',
        citaObj.telefono = '',
        citaObj.hora = '',
        citaObj.fecha = '',
        citaObj.sintomas = ''
}

export function eliminarCita(id) {
    // eliminar la cita
    administarCitas.eliminarCita(id)
    //muestre un mensaje
    ui.imprimirAlertas('Mensaje eliminado')
    //refrescar las citas
    ui.imprimirCitas(administarCitas)
}

//carga los datos y el modo edicion
export function cargarEdicion(cita) {
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