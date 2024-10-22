import React, { useEffect, useState } from 'react'
import { Editar } from './Editar';

export const Listado = ({listadoState, setListadoState}) => {

    //const [listadoState, setListadoState] = useState([]);
    const [editar, setEditar] = useState(0);

    useEffect(() => {

        conseguirPelis();

    }, []);

    const conseguirPelis = () => {
        let peliculas = JSON.parse(localStorage.getItem('pelis'));

        setListadoState(peliculas);

        return peliculas;
    }

    const borrarPeli = (id) => {
        //Conseguir peliculas almacenadas
        let pelis_almacenada = conseguirPelis();

        //Filtrar las peliculas para eliminar la que no quiero
        let nuevo_listado_peliculas = pelis_almacenada.filter(peli => peli.id !== parseInt(id));

        //Actualizar estado del listado
        setListadoState(nuevo_listado_peliculas);

        //Actualizar los datos en el LocalStorage
        localStorage.setItem('pelis', JSON.stringify(nuevo_listado_peliculas));
    }

    return (
        <>
            {listadoState != null ?
                listadoState.map(peli => {
                    return (
                        <article key={peli.id} className="peli-item">
                            <h3 className="title">{peli.titulo}</h3>
                            <p className="description">{peli.descripcion}</p>

                            <button className="edit" onClick={() => setEditar(peli.id)}>Editar</button>
                            <button className="delete" onClick={() => borrarPeli(peli.id)}>Borrar</button>

                            {/* aparece formulario editar */}
                            {editar === peli.id && (
                                <Editar peli = {peli} conseguirPelis={conseguirPelis} setEditar={setEditar} setListadoState={setListadoState}/>
                            )}

                        </article>
                    );
                }) 
                :
                <h2>No hay peliculas para mostrar</h2>
            }
        </>
    )
}
