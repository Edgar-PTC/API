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
                    <button>Editar</button>
                    <button>Eliminar</button>
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
    const nombreForm = getElementById("nombre").value.trim();
    const apellidoForm = getElementById("apellido").value.trim();
    const emailForm = getElementById("email").value.trim();
    const edadForm = getElementById("edad").value.trim();

    //Validacion basica
    if(!nombreForm || !apellidoForm || !emailForm || !edadForm){
        alert("Complete todos los campos");
        return;
    }

    //Llamar API
    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nombreForm, apellidoForm, emailForm, edadForm})
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