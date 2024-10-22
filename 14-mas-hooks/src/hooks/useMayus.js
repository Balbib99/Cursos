//HOOK
//Estas son funciones que podemos crear y personalizar para usarlas
//a lo largo de todo el proyecto. De esta forma en vez de crear la misma
//en varios componentes, solo tendremos que crearla una vez y reutilizarla

import { useState } from "react";

export const useMayus = (texto) => {

    const [miTexto, setMiTexto] = useState(texto);

    const mayusculas = () => {
        setMiTexto(texto.toUpperCase()); 
    }
    
    const minusculas = () => {
        setMiTexto(texto.toLowerCase());
    }

    const concatenar = (valor) => {
        setMiTexto(texto+valor); 
    }

    return {
        estado: miTexto,
        mayusculas,
        minusculas,
        concatenar
    }

}