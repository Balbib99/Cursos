import React, { useContext } from 'react';
import { Routes, Route, NavLink, BrowserRouter } from 'react-router-dom';
import { Inicio } from '../components/Inicio';
import { Articulos } from '../components/Articulos';
import { Acerca } from '../components/Acerca';
import { Contacto } from '../components/Contacto';
import { Login } from '../components/Login';
import { PruebaContext } from '../context/PruebaContext';

export const AppRouter = () => {

    const { usuario, setUsuario } = useContext(PruebaContext);

    return (
        <BrowserRouter>

            <header className='header'>
                {/* MENU DE NAVEGACIÓN */}
                <nav>
                    <div id='logo'>
                        <h2>Aprendiendo</h2>
                    </div>
                    <ul>
                        <li>
                            <NavLink to="/">Inicio</NavLink>
                        </li>
                        <li>
                            <NavLink to="/articulos">Articulos</NavLink>
                        </li>
                        <li>
                            <NavLink to="/acerca">Acerca de</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contacto">Contacto</NavLink>
                        </li>
                        <li>
                            <NavLink to="/login">Login</NavLink>
                        </li>

                        {usuario.hasOwnProperty("nick") && usuario.nick !== null ? (
                            <>
                                <li>
                                    <NavLink to="/">{usuario.nick}</NavLink>
                                </li>
                                <li>
                                    <a href="#" onClick={e => {

                                        e.preventDefault();

                                        setUsuario({});

                                    }}>Cerrar sesión</a>
                                </li>
                            </>
                        ) : (
                            <li>
                                <NavLink to="/login">Identificate</NavLink>
                            </li>
                        )}

                    </ul>
                </nav>
            </header>

            <section className='content'>
                {/* CONFIGURAR RUTAS */}

                <Routes>
                    <Route path='/' element={<Inicio />} />
                    <Route path='/inicio' element={<Inicio />} />
                    <Route path='/articulos' element={<Articulos />} />
                    <Route path='/acerca' element={<Acerca />} />
                    <Route path='/contacto' element={<Contacto />} />
                    <Route path='/login' element={<Login />} />

                    <Route path='*' element={(<div>
                        <h1>ERROR ESTA PÁGINA NO EXISTE</h1>
                    </div>)} />
                </Routes>
            </section>
        </BrowserRouter>
    )
}
