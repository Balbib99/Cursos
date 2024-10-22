import React, {useState} from 'react';


export const MiPrimerEstado = () => {
    

    // Problemática

    // let nombre = "Balbino";

    // const cambiarNombre = () => {
    //     nombre = "Paquillo";
    // }

    
    //Solución

    const [nombre, setNombre] = useState("Balbino");

    const cambiarNombre = (e, nombreFijo) => {
        setNombre(nombreFijo);
    }
  
    return (
    <div>
        <h3>Componente: MiPrimerEstado</h3>
        <strong className={nombre.length >= 4 ? 'verde' : 'rojo'}>
            {nombre}
        </strong>
        &nbsp;
        <button onClick={e => cambiarNombre(e, "Fran")}>Cambiar nombre por Fran</button>

        <input type='text' onKeyUp={e => cambiarNombre(e, e.target.value) } placeholder='Cambia el nombre' />
    </div>
  )
}
