import React from 'react';
import { Routes, Route, NavLink, BrowserRouter, Navigate } from 'react-router-dom';
import { Inicio } from '../components/Inicio';
import { Articulos } from '../components/Articulos';
import { Contacto } from '../components/Contacto';
import { Persona } from '../components/Persona';
import { PanelControl } from '../components/PanelControl';
import { InicioPanel } from '../components/panel/InicioPanel';
import { Crear } from '../components/panel/Crear';
import { Gestion } from '../components/panel/Gestion';
import { Acerca } from '../components/panel/Acerca';

export const RouterPrincipal = () => {
  return (
    <BrowserRouter>

        <h1>Cabecera</h1>
        <hr />

        <nav>
            <ul>
                <li>
                    {/* Con NavLink podemos navegar entre páginas
                    sin que se tenga que recargar la misma y que
                    solo se produzca un cambio de componente */}
                    <NavLink
                        to="/inicio"
                        //Comprobamos si el enlace se encuentra activado, de
                        //ser así le añadiremos un className y resaltaremos
                        //el enlace
                        className={({isActive}) => isActive ? "activado" : ""}>
                            Inicio
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/articulos"
                        className={({isActive}) => isActive ? "activado" : ""}>
                            Articulos
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/contacto"
                        className={({isActive}) => isActive ? "activado" : ""}>
                            Contacto
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/panel"
                        className={({isActive}) => isActive ? "activado" : ""}>
                            Panel de Control
                    </NavLink>
                </li>
            </ul>
        </nav>

        <Routes>

            <Route path='/' element={<Inicio />} />
            <Route path='/inicio' element={<Inicio />} />
            <Route path='/articulos' element={<Articulos />} />
            <Route path='/contacto' element={<Contacto />} />
            <Route path='/persona/:nombre/:apellido' element={<Persona />} />
            <Route path='/persona/:nombre' element={<Persona />} />
            <Route path='/persona' element={<Persona />} />
            <Route path={'/redirigir'} element={<Navigate to="/persona/balbino/martinez"/>} />

            {/* Marcamos que dentro de la ruta "panel" va a haber todas estas subrutas */}
            <Route path={'/panel'} element={<PanelControl />} >
                <Route path='inicio' element={<InicioPanel />} />
                <Route path='crear-articulos' element={<Crear />} />
                <Route path='gestion-articulos' element={<Gestion />} />
                <Route path='acerca-de-ariculos' element={<Acerca />} />
            </Route>
            
            <Route path='*' element={(

                <>

                    <h1>Error 404</h1>
                    <strong>Esta página no existe</strong>

                </>

            )} />

        </Routes>

    </BrowserRouter>
  )
}
