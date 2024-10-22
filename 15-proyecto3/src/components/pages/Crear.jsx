/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react'
import { useForm } from '../../hooks/useForm.js'
import { Ajax } from '../helpers/Ajax'
import { Global } from '../helpers/Global'

export const Crear = () => {

  const {formulario, enviado, cambiado} = useForm({});
  const [resultado, setResultado] = useState(false);

  //Recoge todos los datos que se han ido guardando con el método
  //"cambiado" los cuales han ido a parar al método "formulario"
  // y los guardamos en una sola variable "nuevoArticulo"
  const guardarArticulo = async(e) => {
    e.preventDefault();

    // Recoger datos formulario
    let nuevoArticulo = formulario; //No le hacemos el JSON.stringify() ya que el método ya nos lo hace
    
    // Guardar artículo en el backend
    const {datos} = await Ajax(Global.url+"crear", "POST", nuevoArticulo);

    // Comprueba que los datos se han mandado exitosamente
    if (datos.status === "success") {

      // Si los datos se envían bien, cambiamos de estado el resultado
      setResultado("guardado");

      // ------------- SUBIR LA IMAGEN ------------------

      // Conseguimos el campo donde seleccionaremos la imagen
      const fileInput = document.querySelector("#file");

      const formData = new FormData();
      formData.append('file0', fileInput.files[0]);

      const subida = await Ajax(Global.url+"subir-imagen/" + datos.articulo._id, "POST", formData, true);

      if (subida.datos.status === "success") {
        setResultado("guardado");
      } else {
        setResultado("error");
      }
    
    }else {
      setResultado("error");
    }

    console.log(datos);
  }


  return (
    <div className='jumbo'>
      <h1>Crear artículos</h1>
      <p>Formulario para crear un artículo</p>

      {/* Dependiendo de si se ha creado correctamente el artículo o no, nos aparecerá el
      mensaje correspondiente */} 
      <strong>{resultado == "guardado" ? "Articulo guardado con exito!!" : ""}</strong>
      <strong>{resultado == "error" ? "Los datos proporcionados son incorrectos" : ""}</strong>

      {/* montar formulario */} 
      <form className='formulario' onSubmit={guardarArticulo}>

        <div className='form-group'>
          <label htmlFor='titulo'>Titulo</label>
          {/* A tarvés del método "cambiado" vamos guardando los datos
          que introducimos en cada campo; estos se quedan guardaos
          en el método "formulario" */}
          <input type='text' name='titulo' onChange={cambiado}/>
        </div>

        <div className='form-group'>
          <label htmlFor='contenido'>Contenido</label>
          <textarea type='text' name='contenido' onChange={cambiado}/>
        </div>

        <div className='form-group'>
          <label htmlFor='file0'>Imagen</label>
          <input type='file' name='file0' id='file' onChange={cambiado}/>
        </div>

        <input type='submit' value="Guardar" className='btn btn-success' />

      </form>
    </div>
  )
}
