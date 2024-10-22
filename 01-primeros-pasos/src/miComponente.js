//Importar modulos de react / dependencias
import React from "react";

//Función del componente
const MiComponente = () => {

    // let nombre = "Balbino";
    // let web = "balbinoMartinez.es";

    let usuario = {
        nombre: "Balbino",
        apellido: "Martinez",
        web: "balbinomartinez.es"
    }

    return (

        //Podemos introducir cosas dentro del return de dos formas diferentes

        //1ª FORMA:

        // <> "Fragment": Esto nos permite introducir más de una etiqueta html dentro del return
        // <hr/>
        // <h2>Componente creado</h2>
        // <p>Este es mi primer componente</p>
        // </>

        //2ª FORMA:

        <div className="mi-componente">
            <hr />
            <h2>Componente creado</h2>
            <h3>Datos del usuario:</h3>
            <ul>
                <li>
                    Nombre: <strong>{usuario.nombre}</strong>
                </li>
                <li>
                    Apellido: <strong>{usuario.apellido}</strong>
                </li>
                <li>
                    Web: <strong>{usuario.web}</strong>
                </li>
            </ul>
            <p>Este es mi primer componente</p>
        </div>
    )
}

//Export
export default MiComponente;