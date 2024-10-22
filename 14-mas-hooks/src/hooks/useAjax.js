import { useState, useEffect } from "react";

export const useAjax = (url) => {
    const [estado, setEstado] = useState({
        datos: null,
        cargando: true
    });

    const getData = async () => {

        setEstado({
            ...estado,
            cargando: true
        })

        //Se realiza la petición a la API
        const peticion = await fetch(url);

        //Recojo los datos de la petición y lo hagoi legibles
        const { data } = await peticion.json();

        //Actualizo los datos del usuario
        setEstado({
            datos: data,
            cargando: false
        })
    }

    useEffect(() => {
        getData();
    }, [url]);

    return {
        datos: estado.datos,
        cargando: estado.cargando
    }
}