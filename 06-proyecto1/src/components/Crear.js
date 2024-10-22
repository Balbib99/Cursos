import React, { useState } from 'react'
import { GuardarEnStorage } from '../helper/GuardarEnStorage';

export const Crear = ({setListadoState}) => {

    const titulo = "Añadir película";

    const [peliState, setPeliState] = useState({
        titulo: '',
        descripcion: ''
    });

    const conseguirDatosForm = e => {
        e.preventDefault();

        // Conseguir datos del formulario
        let target = e.target;
        let titulo = target.titulo.value;
        let descripcion = target.descripcion.value;

        // Crear objeto de la película a crear
        let peli = {
            id: new Date().getTime(),
            titulo,
            descripcion
        }

        //Guardar estado
        setPeliState(peli);

        //Actalizar el estado del listado principal
        setListadoState(elementos => {
            return [peli, ...elementos]
        });

        //Guardar en el almacenamiento local
        GuardarEnStorage("pelis", peli);
    }

    return (
        <div className="add">
            <h3 className="title">{titulo}</h3>

            {(peliState.titulo && peliState.descripcion ) && peliState.titulo}

            <form onSubmit={conseguirDatosForm}>
                <input type="text" id='titulo' name='titulo' placeholder="Titulo" />
                <textarea placeholder="descripción" id='descripcion' name='descripcion'></textarea>
                <input type="submit" value="Guardar" />
            </form>
        </div>
    )
}
