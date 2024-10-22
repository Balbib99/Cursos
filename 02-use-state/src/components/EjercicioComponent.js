import React, {useState} from 'react';
import PropTypes from "prop-types";

export const EjercicioComponent = ({year}) => {
  
  const [yearNow, setYearNow] = useState(year);

  const siguiente = e => {
    setYearNow(yearNow + 1 )
  }

  const anterior = e => {
    setYearNow(yearNow - 1 )
  }

  const changeYear = e => {
    let dato = parseInt(e.target.value);

    if(Number.isInteger(dato)){
        setYearNow(dato);
    }else{
        setYearNow(year)
    }
  }
  
    return (
    <div>
        <h2>Ejercicios con Eventos y UseState</h2>
        <strong className='label label-green'>
            {yearNow}
        </strong>

        <p>
            <button onClick={ siguiente }>SIGUIENTE</button>
            &nbsp;
            <button onClick={ anterior }>ANTERIOR</button>
        </p>
        <p>
            Cambiar Año: &nbsp;
            <input type='text' onChange={ changeYear } placeholder='Cambia de año'></input>
        </p>
    </div>
  )
}

EjercicioComponent.prototype = {
    year: PropTypes.number.isRequired
}