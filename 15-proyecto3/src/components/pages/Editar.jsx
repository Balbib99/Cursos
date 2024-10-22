/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from '../../hooks/useForm.js'
import { Ajax } from '../helpers/Ajax'
import { Global } from '../helpers/Global'
import { useParams } from 'react-router-dom'

export const Editar = () => {

  const {formulario, enviado, cambiado} = useForm({});
  const [resultado, setResultado] = useState(false);
  const [article, setArticle] = useState([]);
  const params = useParams();

  useEffect(() => {

    getArticle();

  }, [])

  const getArticle = async () => {

    const { datos } = await Ajax(Global.url + "articulo/" + params.id, "GET");

    if (datos.status === "success") {
      setArticle(datos.articulo);
      console.log(datos.articulo);
    }

  }

  //Recoge todos los datos que se han ido guardando con el método
  //"cambiado" los cuales han ido a parar al método "formulario"
  // y los guardamos en una sola variable "nuevoArticulo"
  const editarArticulo = async(e) => {
    e.preventDefault();

    // Recoger datos formulario
    let nuevoArticulo = formulario; //No le hacemos el JSON.stringify() ya que el método ya nos lo hace
    
    // Guardar artículo en el backend
    const {datos} = await Ajax(Global.url + "articulo/" + params.id, "PUT", nuevoArticulo);
    console.log(datos);

    // Comprueba que los datos se han mandado exitosamente
    if (datos.status === "success") {
      console.log("HOLA");

      // Si los datos se envían bien, cambiamos de estado el resultado
      setResultado("guardado");

      // ------------- SUBIR LA IMAGEN ------------------

      // Conseguimos el campo donde seleccionaremos la imagen
      const fileInput = document.querySelector("#file");

      const formData = new FormData();
      formData.append('file0', fileInput.files[0]);

      const subida = await Ajax(Global.url + "subir-imagen/" + datos.articulo_actualizado._id, "POST", formData, true);

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
      <h1>Editar artículos</h1>
      <p>Formulario para editar: {article.titulo}</p>

      {/* Dependiendo de si se ha creado correctamente el artículo o no, nos aparecerá el
      mensaje correspondiente */} 
      <strong>{resultado == "guardado" ? "Articulo guardado con exito!!" : ""}</strong>
      <strong>{resultado == "error" ? "Los datos proporcionados son incorrectos" : ""}</strong>

      {/* montar formulario */} 
      <form className='formulario' onSubmit={editarArticulo}>

        <div className='form-group'>
          <label htmlFor='titulo'>Titulo</label>
          {/* A tarvés del método "cambiado" vamos guardando los datos
          que introducimos en cada campo; estos se quedan guardaos
          en el método "formulario" */}
          <input type='text' name='titulo' onChange={cambiado} defaultValue={article.titulo}/>
        </div>

        <div className='form-group'>
          <label htmlFor='contenido'>Contenido</label>
          <textarea type='text' name='contenido' onChange={cambiado} defaultValue={article.contenido}/>
        </div>

        <div className='form-group'>
          <label htmlFor='file0'>Imagen</label>

          <div className='mascara'>

            {/* Si se detecta la imagen como por defecto, pondremos la imagen "default.png", en cambio, 
            si detecta una imagen diferente, podremos esa misma */}
            {article.imagen == "default.png" && <img src='data:image/png;base64,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' />}
            {article.imagen != "default.png" && <img src={Global.url + "imagen/" + article.imagen} />}

          </div>

          <input type='file' name='file0' id='file'/>
        </div>

        <input type='submit' value="Guardar" className='btn btn-success' />

      </form>
    </div>
  )
}
