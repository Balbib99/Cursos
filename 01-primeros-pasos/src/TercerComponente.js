import React from 'react';
import PropTypes from 'prop-types';

export const TercerComponente = ({nombre, apellido, ficha}) => {

  return (
    <div>
        <h1>Comunicación entre componentes</h1>
        <ul>
            <li>{nombre}</li>
            <li>{apellido}</li>
            <li>{ficha.grupo}</li>
            <li>{ficha.estado}</li>
        </ul>
    </div>
  )
}

//Podemos validar que las props que pasemos sean validas, es decir, que nos aseguremos de que las pasamos y que son del tipo que queremos
TercerComponente.propTypes = {
    nombre: PropTypes.string.isRequired, //Validamos que este prop sea de tipo string y marcamos que se debe pasar obligatoriamente
    apellido: PropTypes.string.isRequired,
    ficha: PropTypes.object //Validamos que este prop sea de tipo objeto pero no es obligatorio pasarlo
}

//Podemos crear props por defecto, para en el caso de no pasarselas, las interprete por defecto
TercerComponente.defaultProps = {
    nombre: "Juan",
    apellido: "Gomez"
}