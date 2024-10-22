import React, { useState } from 'react'
import { useMayus } from '../hooks/useMayus';

export const PruebasCustom = () => {

    const {estado, mayusculas, minusculas, concatenar} = useMayus("Balbino Martinez web");
    

  return (
    <div>
        <h1>Probando componentes personalizados</h1>
        <h2>{estado}</h2>

        <button onClick={ mayusculas }>Poner en mayusculas</button>
        <button onClick={ minusculas }>Poner en minusculas</button>
        <button onClick={ e => concatenar("- Probando hooks Personalizados") }>Concatenar</button>
    </div>
  )
}
