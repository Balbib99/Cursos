import React, { useState } from 'react'
import { useForm } from '../hooks/useForm';

export const MiFormulario = () => {


    //Utilizamos el hook que hemos creado nostros "useForm" para
    //usar todas las funcionalidades
    const {formulario, cambiado, enviado} = useForm({});

  return (
    <div>
        <h1>Formulario</h1>
        <p>Formulario para guardar un curso</p>
        <p>Curso guardado: {formulario.titulo}</p>
        <pre className='codigo'>{JSON.stringify(formulario)}</pre>

        <form onSubmit={enviado} className='miFormulario'>
            <input type='text' name='titulo' onChange={cambiado} placeholder='Titulo:' />
            <input type='number' name='anio' onChange={cambiado} placeholder='Año publicación:' />
            <textarea name='descripcion' onChange={cambiado} placeholder='Descripción:'></textarea>
            <input type='text' name='autor' onChange={cambiado} placeholder='Autor:' />
            <input type='email' name='email' onChange={cambiado} placeholder='Correo de contacto:' />


            <input type='submit' value="Enviar" />
        </form>
    </div>
  )
}
