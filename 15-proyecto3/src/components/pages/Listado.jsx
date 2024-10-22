/* eslint-disable no-unused-vars */
import React from 'react'
import { Global } from '../helpers/Global';
import { Ajax } from '../helpers/Ajax';
import { Link } from 'react-router-dom';

export const Listado = ({articles, setArticles}) => {

  const eliminar = async(id) => {

    // Realizamo una petición a la API para encontrar el articulo cuyo id queremos borrar
    let {datos} = await Ajax(Global.url + "articulo/" + id, "DELETE");

    if (datos.status == "success") {
      
      // Hacemos un filtro de articulos para actualizar la lista de articulos y solo quedarnos
      // con los articulos que tenga un id diferente al que hemos pasado por parámetro
      let articulosActualizados = articles.filter(articulo => articulo._id != id);
      
      // Actualizamos la lista de articulos
      setArticles(articulosActualizados);

    }
  }

  return (
    articles.map(article => {

        return (
          < article key={article._id} className="articulo-item" >
            <div className='mascara'>

              {/* Si se detecta la imagen como por defecto, pondremos la imagen "default.png", en cambio, 
              si detecta una imagen diferente, podremos esa misma */}
              {article.imagen == "default.png" && <img src='data:image/png;base64,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' />}
              {article.imagen != "default.png" && <img src={Global.url + "imagen/" + article.imagen} />}
            
            </div>

            <div className='datos'>

              <h3 className="title"><Link to={"/articulo/" + article._id}>{article.titulo}</Link></h3>
              <p className="description">{article.contenido}</p>

              <Link to={"/editar/" + article._id} className="edit">Editar</Link>
              <button className="delete" onClick={() => {
                eliminar(article._id);
              }}>Borrar</button>

            </div>
          </article >
        );
      })
  )
}
