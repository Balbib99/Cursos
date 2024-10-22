import React from 'react'

export const EventosComponente = () => {

    const hasDadoClick = (e, nombre) => {
        alert("Has dado click al botón !!" + nombre);
    }

    function hasDadoDobleClick(e) {
        alert("Has dado doble click");
    }

    const hasEntrado = (e, accion) => {
        alert(`Has ${accion} a la caja con el mouse`);
    }

    const estasDentro = (e) => {
        console.log("Estas dentro del input, mete tu nombre");
    }

    const estasFuera = (e) => {
        console.log("Estas fuera del input, mete tu nombre");
    }

    return (
        <div>
            <h1>
                Eventos en React
            </h1>

            <p>
                {/* Evento click */}
                <button onClick={e => hasDadoClick(e, "Balbino")}>Dame click</button>
            </p>

            <p>
                {/* Evento doble click */}
                <button onDoubleClick={hasDadoDobleClick}>Dame doble click</button>
            </p>

            <p id='caja' onMouseEnter={e => hasEntrado(e, "entrado")} onMouseLeave={e => hasEntrado(e, "salido")}>
                {/* Evento onMouseEnter onMouseLeave */}
                Pasa por encima
            </p>

            <p>
                <input type='text' onFocus={ estasDentro } onBlur={estasFuera} placeholder='Introduce tu nombre'/>
            </p>
        </div>
    )
}
