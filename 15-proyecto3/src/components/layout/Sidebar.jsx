/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Global } from '../helpers/Global';

export const Sidebar = () => {

  const [buscar, setBuscar] = useState("");
  const navegar = useNavigate();

  const hacerBusqueda = (e) => {
    e.preventDefault();

    let mi_busqueda = e.target.search_field.value;

    navegar("/buscar/" + mi_busqueda, { replace: true })
  }

  return (
    // Barra lateral
    <aside className="lateral">
      <div className="search">
        <h3 className="title"> Buscador</h3>
        <form onSubmit={hacerBusqueda}>
          <input type="text" id='search_field'/>
          <input type='submit' id='search' value="Buscar" />
        </form>
      </div>

      {/* <div className="add">
        <h3 className="title">Pelicula</h3>
        <form>
          <input type="text" placeholder="Titulo" />
          <textarea placeholder="descripción"></textarea>
          <input type="submit" value="Guardar" />
        </form>
      </div> */}
    </aside>
  )
}
