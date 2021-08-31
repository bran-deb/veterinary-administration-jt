import Citas from "./clases/Citas.js"
import UI from "./clases/UI.js"
import { mascotaInput, propietarioInput, telefonoInput, horaInput, fechaInput, sintomasInput, formulario } from './selectores.js';
//Instancias
const ui = new UI()
const administrarCitas = new Citas()


//Objects
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    hora: '',
    fecha: '',
    sintomas: ''
}

let editando = false

//agrega datos de cita
export function datosCita(e) {
    //para evitar llenar el objeto uno por uno
    //obtenemos el nombre del evento con .name
    citaObj[e.target.name] = e.target.value;
}

//valida y agrega ua nueva cita a la clase de citas
export function nuevaCita(e) {
    e.preventDefault()
    //extraer informacion del ojeto de cita
    const { mascota, propietario, telefono, hora, fecha, sintomas } = citaObj
    // validar
    if ((mascota && propietario && telefono && hora && fecha && sintomas) === '') {
        ui.imprimirAlerta('Todos los campos son Obligatorios', 'error')
        return
    }
    if (editando) {
        //pasar el objeto de la cita a edicion
        administrarCitas.editarCita({ ...citaObj })

        ui.imprimirAlerta('Se edito correctamente')

        //regresar el boton al estado original
        formulario.querySelector('button[type="submit"]').textContent = 'crear Cita'
        // quitar modo edicion
        editando = false
    } else {
        //generar un id
        citaObj.id = Date.now()
        //crea nueva cita usando unaa copia de citaObj
        administrarCitas.agregarCita({ ...citaObj })
        //mensaje de agregado correctamente
        ui.imprimirAlerta('Se agrego correctamente')
    }

    //mostrarHTML
    ui.imprimirCitas(administrarCitas)
    // reiniciamos objeto para la validacion
    reiniciarObj()
    // reiniciamos formulario
    formulario.reset()
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
    administrarCitas.eliminarCita(id)
    //muestre un mensaje
    ui.imprimirAlerta('Mensaje eliminado')
    //refrescar las citas
    ui.imprimirCitas(administrarCitas)
}

//carga los datos y el modo edicion
export function cargarEdicion(cita) {
    const { mascota, propietario, telefono, hora, fecha, sintomas, id } = cita
    //llenar inputs
    mascotaInput.value = mascota
    propietarioInput.value = propietario
    telefonoInput.value = telefono
    horaInput.value = hora
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
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true
}