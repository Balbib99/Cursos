/* eslint-disable no-unused-vars */
export const Ajax = async (url, metodo, datosGuardar = "", archivos = false) => {
    
    let cargando = true;

    let opciones = {
        method: "GET"
    }

    if (metodo == "GET" || metodo == "DELETE") {
        opciones = {
            method: metodo
        }
    }

    if (metodo == "POST" || metodo == "PUT") {

        if (archivos) {

            opciones = {
                method: metodo,
                body: datosGuardar
            }
            
        } else {

            opciones = {
                method: metodo,
                body: JSON.stringify(datosGuardar),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        }

    }

    //Se realiza la petición a la API
    const peticion = await fetch(url, opciones); //Importante!! mandar la variable opciones

    //Recojo los datos de la petición y lo hagoi legibles
    const datos = await peticion.json();

    //Actualizo los datos del usuario
    cargando = false;

    return {
        datos,
        cargando
    }
}

