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