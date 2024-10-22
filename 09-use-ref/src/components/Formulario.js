import React, { useRef } from 'react'

export const Formulario = () => {

    const nombre = useRef();
    const apellido = useRef();
    const email = useRef();
    const miCaja = useRef();

    const mostrar = e =>{
        e.preventDefault();

        console.log(nombre.current.value);
        console.log(apellido.current.value);
        console.log(email.current.value);

        //mi caja; forma de acceder al div sin usar el document.queryselector('.miCaja')
        let { current: caja } = miCaja
        caja.classList.add("fondoVerde");
        caja.innerHTML = "Formulario enviado";
    }

  return (
    <div>
        <h1>Formulario</h1>

        <div ref={miCaja} className='miCaja'>
            <h2>Mi caja</h2>
        </div>

        <form onSubmit={mostrar}>
            <input type='text' placeholder='Nombre' ref={nombre}/><br />
            <input type='text' placeholder='Apellidos' ref={apellido}/><br />
            <input type='email' placeholder='Correo' ref={email}/><br />

            <input type='submit' value='Enviar' />
        </form>
    </div>
  )
}
