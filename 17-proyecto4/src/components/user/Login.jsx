/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { Global } from '../../helpers/Global';
import useAuth from '../../hooks/useAuth';

export const Login = () => {

  // Hcaemos uso del hook useForm() que hemos creado para recoger datos de un formulario
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not_sended")

  const {setAuth} = useAuth();

  const loginUser = async (e) => {
    e.preventDefault();

    // Datos del formulario
    let userToLogin = form;

    // Petición al backend
    const request = await fetch(Global.url + "user/login", {
      method: "POST",
      body: JSON.stringify(userToLogin),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await request.json();

    // Cambiamos el estado de setSaved() dependiendo de como haya salido la operación
    if (data.status == "success") {

      // Persistir los datos en el navegador
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      setSaved("login");

      // Setear datos en el auth
      setAuth(data.user);

      // Redirección a mi feed
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } else {
      setSaved("error");
    }
  }

  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Login</h1>
      </header>

      <div className="content__posts">

        {saved == "login" ?
          <strong className='alert alert-success'> Usuario identificado correctamente !! </strong>
          : ""}

        {saved == "error" ?
          <strong className='alert alert-danger'>El usuario no existe !!</strong>
          : ""}
        
        <form className='form-login' onSubmit={loginUser}>

          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' onChange={changed} />
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Contraseña</label>
            <input type='password' name='password' onChange={changed} />
          </div>

          <input type='submit' value="Identificate" className='btn btn-success' />

        </form>
      </div>
    </>
  )
}
