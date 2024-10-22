import React from 'react'
import { NavLink } from 'react-router-dom';

export const HeaderNav = () => {
  return (
    <header className='header'>
        <div className='logo'>
            <span>B</span>
            <h3>Balbino Martínez WEB</h3>
        </div>

        <nav>
            <ul>
                <li>
                    <NavLink to="/inicio">Inicio</NavLink>
                </li>
                <li>
                    <NavLink to="/portafolio">Portafolio</NavLink>
                </li>
                <li>
                    <NavLink to="/servicios">Servicios</NavLink>
                </li>
                <li>
                    <NavLink to="/contacto">Contacto</NavLink>
                </li>
                <li>
                    <NavLink to="/curriculum">Curriculum</NavLink>
                </li>
            </ul>
        </nav>

    </header>
  )
}
