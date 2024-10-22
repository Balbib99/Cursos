import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

export const EjemploComponent = () => {

    const [mostrar, setMostrar] = useState(false);

    const caja = useRef();
    const boton = useRef();

    //Se ejecuta antes de que se pinte nada por pantalla

    // useLayoutEffect(() => {
    //     console.log("useLayoutEffect: Componente cargado!!");

    // }, [])

    //Se ejecuta después de que se pinte todo por pantalla
    useEffect(() => {
        console.log("useEffect: Componente cargado!!");

        if (caja.current == null) return

        const { bottom } = boton.current.getBoundingClientRect();

        caja.current.style.top = `${bottom + 45}px`;
        caja.current.style.left = `${bottom + 45}px`;

    }, [mostrar])

    return (
        <div>
            <h1>Ejemplo useEffect y useLayoutEffect</h1>

            {/* (prev => !prev) con esto hacemos que coja su estado, y cada vez
        que clikemos nos lo cambie por su contrario.
        De esta manera, cuando sea false se cambiará a true y cuando
        sea true se cambiaré a false */}
            <button ref={boton} onClick={() => setMostrar(prev => !prev)}>Mostrar mensaje</button>

            {/* Cuando el estado de "mostrar" sea true, la caja aparecerá, y Cuando
        sea false desaparecerá */}
            {mostrar && (
                <div id='caja' ref={caja}>
                    Hola, soy una caja {mostrar}
                </div>
            )}
        </div>
    )
}
