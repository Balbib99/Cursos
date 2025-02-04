/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { Global } from '../../helpers/Global';

export const Register = () => {

  const { form, changed } = useForm();

  // Creamos el estado de guardado para comprobar si el usuario se ha creado correctamente
  const [saved, setSaved] = useState("not_sended")

  const saveUser = async (e) => {
    // Prevenir actualización de pantalla
    e.preventDefault();

    // Recoger datos del formulario
    let newUser = form;

    // Guardar usuario en el backend
    const request = await fetch(Global.url + "user/register", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json"
      }
    });

    // Recibimos el mensaje del backend
    const data = await request.json(); // Importante el await, para que espere al resultado

    // Cambiamos el estado de setSaved() dependiendo de como haya salido la operación
    if (data.status == "success") {
      setSaved("saved");
    } else {
      setSaved("error");
    }
  }

  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Register</h1>
      </header>

      <div className="content__posts">

        {saved == "saved" ?
          <strong className='alert alert-success'> Usuario registrado correctamente !! </strong>
         : ""}
        
        {saved == "error" ?
          <strong className='alert alert-danger'>Usuario no se ha registrado !!</strong>
        : ""}

        <form className='register-form' onSubmit={saveUser}>
          <div className='form-group'>
            <label htmlFor='name'>Nombre</label>
            <input type='text' name='name' onChange={changed} />
          </div>

          <div className='form-group'>
            <label htmlFor='surname'>Apellidos</label>
            <input type='text' name='surname' onChange={changed} />
          </div>

          <div className='form-group'>
            <label htmlFor='nick'>Nick</label>
            <input type='text' name='nick' onChange={changed} />
          </div>

          <div className='form-group'>
            <label htmlFor='email'>Correo electrónico</label>
            <input type='email' name='email' onChange={changed} />
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Contraseña</label>
            <input type='password' name='password' onChange={changed} />
          </div>

          <input type='submit' value="Registrate" className='btn btn-success' />
        </form>

      </div>
    </>
  )
}
