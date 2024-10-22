/* eslint-disable no-unused-vars */
import React from 'react'
import { useState, useEffect } from 'react'
import { Global } from '../helpers/Global';
import { Ajax } from '../helpers/Ajax';
import { Listado } from './Listado';


export const Articulos = () => {

  const [articles, setArticles] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {

    getArticles();

  }, [])

  const getArticles = async () => {

    const { datos, cargando } = await Ajax(Global.url + "articulos", "GET");

    if (datos.status === "success") {
      setArticles(datos.articulos);
    }

    setCargando(false);

  }

  return (
    <>
      {/* Por cada articulo que encuentre crea uno */}
      {cargando ? "Cargando..." :
        
        articles.length >= 1 ? <Listado articles={articles} setArticles={setArticles}/> : <h1>No hay articulos</h1>
        
      }
    </>
  )
}
