import React, { useEffect, useState } from 'react'
import { AvisoComponent } from './AvisoComponent';

export const PruebasComponent = () => {

    const [usuario, setUsuario] = useState("Balbino");
    const [fecha, setFecha] = useState("01-01-1978");

    const [contador, setContador] = useState(0);

    const modUsuario = e =>{
        setUsuario(e.target.value);
    }

    //Solo se ejecuta una vez al cargar el componente
    useEffect(() =>{
        console.log("Has cargado el componente");
    }, []);

    //Se ejecuta solo si cambio el usuario (gracias a los corchetes, puedes decidir con que acción debe actuar este efecto)
    useEffect(() =>{

        setContador(contador + 1);

        console.log("Has modificado el usuario"+contador);
    }, [fecha, usuario]);

    const cambiar = e => {
        setFecha(Date.now());
    }

  return (
    <div>
        <h1>
            El efecto - Hook UseEffect
        </h1>
        <strong >{usuario}</strong>
        <strong className={ contador >= 10 ? 'label label-green' : 'label'}>{fecha}</strong>
        
        <p>
            <input type='text' onChange={ modUsuario } placeholder='Cambia el nombre' />
            <button onClick={cambiar} >Cambio</button>
        </p>

        {usuario == "Paquillo" && <AvisoComponent />}

    </div>
  )
}
