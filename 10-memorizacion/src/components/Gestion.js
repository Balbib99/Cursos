import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Empleados } from './Empleados'

export const Gestion = () => {

    const [nombre, setNombre] = useState("");
    const [pagina, setPagina] = useState(1);

    useEffect(() => {
      console.log("la vista se ha renderizado");  
    }, [nombre, pagina])

    const gestorInput = useRef();

    const asignarGestor = e => {
      setNombre(e.target.value);
    }

    //Podemos controlar cuando aparece el mesaje, marcándole que
    //aparecerá solo cuando se modifique el estado de la página
    const mostrarMensaje = useCallback(() => {
      console.log("Hola que tal soy un mensaje desde el componente Empleados!!");
    }, [pagina])

    //TANTO CON EL useMemo() COMO CON EL useCallback() ESTAMOS 
    //MEJORANDO EL RENDIMIENTO Y OPTIMIZACIÓN DE NUESTRO PROGRAMA Y
    //PÁGINA WEB
  return (
    <div>
        <h1>Nombre del gestor: {nombre}</h1>
        <input type='text' onChange={asignarGestor} placeholder='Introduce tu nombre de Gestor' />

        <h2>Listado de empleados:</h2>
        <p>Los usuarios son gestionados por {nombre} vienen de jsonplaceholder...</p>
        <button onClick={() => setPagina(1)}>Página 1</button>
        <button onClick={() => setPagina(2)}>Página 2</button>

        <Empleados pagina={pagina} mensaje={mostrarMensaje}/>
    </div>
  )
}
