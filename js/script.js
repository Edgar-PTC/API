//url de la API
const API_URL = "https://retoolapi.dev/DudDZC/data";

//Funcion que manda a traer al Json
async function obtenerPersonas() {
    //Respuesta del Servidor
    const res = await fetch(API_URL); //Se hace la llamada al endpoint

    //Pasamos a Json la respuesta del servidor
    const data = await res.json(); //Esto es un Json

    //Enviamos el Json que nos manda la API a la funcion que crea la tabla en HTML
    mostrarDatos(data);
}

//La funcion lleva un parametro datos que representa al archivo Json
function mostrarDatos(datos){
    //se llama especificamente al Tbody que esta en la tabla con id tabla
    const tabla = document.querySelector('#tabla tbody');
    //para inyectar codigo HTML utilizamos innerHTML
    tabla.innerHTML = ''; //Vaciamos el contenido de la tabla

    datos.forEach(persona => {
        tabla.innerHTML += `
            <tr>
                <td>${persona.id}</td>
                <td>${persona.nombre}</td>
                <td>${persona.apellido}</td>
                <td>${persona.email}</td>
                <td>${persona.edad}</td>
                <td>
                    <button onClick="AbrirModalEditar(${persona.id}, '${persona.nombre}', '${persona.apellido}', '${persona.email}', '${persona.edad}')">Editar</button>
                    <button onClick="EliminarPersona(${persona.id})">Eliminar</button>
                </td>
            </tr>
        `
    });

};

obtenerPersonas();

//Agregar nuevo registro
const modal = document.getElementById("modal-agregar");
const btnAgregar = document.getElementById("btnAbrirModal");
const btnCerrar = document.getElementById("btnCerrarModal");

btnAgregar.addEventListener("click", () => {
    modal.showModal();
});

btnCerrar.addEventListener("click", () => {
    modal.close();
});

//Agregar nuevo nitegrante desde el formulario
document.getElementById("frmAgregar").addEventListener("submit", async e => {
    e.preventDefault();//"e" representa al evento submit - EVITA QUE EL FORMULARIO SE ENVIE DE GOLPE

    //Capturar los valores del form
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim();
    const edad = document.getElementById("edad").value.trim();

    //Validacion basica
    if(!nombre || !apellido || !email || !edad){
        alert("Complete todos los campos");
        return;
    }

    //Llamar API
    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nombre,apellido,email,edad})
    });

    if(respuesta.ok){
        alert("El registro fue agregado correctamente");

        //Limpiar y cerrar el dialog
        document.getElementById("frmAgregar").reset();
        modal.close();

        //Recargar tabla
        obtenerPersonas();
    }
    else{
        alert("Hubo un error al agregar");
    }
});

//FUNCION PARA BORRAR REGISTROS
async function EliminarPersona(id) {
        const confirmacion = confirm("¿Realmente deseas eliminar el registro?")
        
        //Validamos si el usuario dijo que si
        if(confirmacion){
            await fetch(`${API_URL}/${id}`, {method:"DELETE"});

            //RECARGAMOS LA TABLA
            obtenerPersonas();
        }
}

//Proceso para editar un registro
const modaleditar = document.getElementById("modal-editar");
const btnCerrarEditar = document.getElementById("btnCerrarEditar");

//Para cerrar el formulario
btnCerrarEditar.addEventListener("click", () => {
    modaleditar.close();
});

function AbrirModalEditar(id, nombre, apellido, email, edad){
    //Se agregan los valores del registrp en los input
    document.getElementById("idEditar").value = id;
    document.getElementById("nombreEditar").value = nombre;
    document.getElementById("apellidoEditar").value = apellido;
    document.getElementById("emailEditar").value = email;
    document.getElementById("edadEditar").value = edad;

    //Modal se abre despues de agregar los valores a los input
    modaleditar.showModal();
}