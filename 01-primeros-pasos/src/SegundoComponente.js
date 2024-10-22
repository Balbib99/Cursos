import React from 'react'

export const SegundoComponente = () => {

    const libros = ["Harry Potter", "Juego de Tronos", "Clean Code"];
    // const libros = [];

    return (
        <div>SegundoComponente
            <h1>Listado de libros:</h1>

            {/* Si hay libros, mustramelos, si no, muestrame el parrafo final */}
            
            {
                libros.length >= 1 ? (
                    <ul>
                        {
                            libros.map((libro, indice) => {
                                return <li key={indice}>{libro}</li>;
                            })
                        }


                        {/* <li>{libros[0]}</li>
                            <li>{libros[1]}</li>
                            <li>{libros[2]}</li> */}

                    </ul>)
                    : (
                        <p>No hay libros</p>
                    )
            }
        </div>
    )
}
