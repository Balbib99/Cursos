import React from 'react';
import { Link } from 'react-router-dom';
import { ListadoTrabajos } from './ListadoTrabajos';

export const Inicio = () => {
  return (
    <div className='home'>

      <h1>
        Hola, soy <strong>Balbino Martínez</strong> y soy Desarrollador Web en Valladolid,
        y ofrezco mis servicios de <strong>programación</strong> y <strong>desarrollo</strong> en todo tipo
        de proyectos web.
      </h1>

      <h2 className='title'>
        Te ayudo a crear tu sitio o aplicació web, tener más visibilidad y relevancia en internet. <Link to={"/contacto"}>Contacta conmigo.</Link>
      </h2>

      <section>
        <h2 className='heading'>Algunos de mis proyectos</h2>
        <p>Estos son algunos de mis trabajos de desarrollo web.</p>

        <ListadoTrabajos limite="2" />
      </section>

    </div>
  )
}
