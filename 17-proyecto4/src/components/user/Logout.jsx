/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom';

export const Logout = () => {

    const {setAuth, setCounters} = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        // Vaciar el localStorage
        localStorage.clear();

        // Setear estados globales a vacio
        setAuth({});
        setCounters({});

        //Navigate (redirección) al login
        navigate("/login");
    })

  return (
    <h1>Cerrando sesión...</h1>
  )
}
