import React, { useId } from 'react'

export const MiComponente = () => {

    //Creamos un identificador que nuca se repetirá en la aplicación
    const id = useId();
    console.log(id);

    const segundoId = useId();
    console.log(segundoId);

  return (
    <div>
        <h1>Hook useID</h1>
        <input id={id} name='nombre' placeholder='Nombre' />
    </div>
  )
}
