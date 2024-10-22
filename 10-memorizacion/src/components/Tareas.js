import React, { useMemo, useState } from 'react'

export const Tareas = () => {

    const [tareas, setTareas] = useState([]);
    const [contador, setContador] = useState(6230);

    const guardarTareas = e => {
        e.preventDefault();

        //Guardamos todas las tareas en el array por medio del estado
        //de las tareas. cargamos todas las tareas añadidas y guardamos
        //la nueva
        setTareas(tarea => [...tarea, e.target.descripcion.value]);

    }

    const borrarTarea = id => {
        //Filtrar las tareas para borrar la que no quiero
        let nuevas_tareas = tareas.filter( (tarea, indice) => indice !== id );
        console.log(nuevas_tareas);

        //Set State, guardar el nuevo listado de tareas en el estado
        setTareas(nuevas_tareas);
    }

    const sumarAlContador = e => {
        setContador(contador + 1);
    }

    const contadorsPasados = (acumulacion) => {

        for (let i = 0; i <= acumulacion; i++) {
            console.log("Ejecutando acumulación de contadores del pasado...");
            
        }


        return `Contador manual de tareas: ${acumulacion}`;
    }

    const memoContadores = useMemo(() => contadorsPasados(contador), [contador])

  return (
    <div className='tareasContainer'>
        <h1>Mis tareas</h1>

        <form onSubmit={guardarTareas}>
            <input type='text' name='descripcion' placeholder='Describe la tarea'/>
            <input type='submit' value="guardar" />
        </form>

        <h3>{memoContadores}</h3>
        <button onClick={sumarAlContador}>sumar</button>

        <h3>Lista de tareas: </h3>
        {
            tareas.map((tarea, indice) => {
                return (
                    <li key={indice}>
                        {tarea}
                        &nbsp;
                        <button onClick={() => borrarTarea(indice)}>X</button>
                    </li>
                )
            })
        }
    </div>
  )
}
