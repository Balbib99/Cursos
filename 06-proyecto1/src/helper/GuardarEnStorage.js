export const GuardarEnStorage = (clave, elemento) => {

    //Conseguir los elementos que ya tenemos en el localStorage
    let elementos = JSON.parse(localStorage.getItem(clave));

    //Comprobar si es un array
    if (Array.isArray(elementos)) {
        
        //Añadir dentro del array un elemento nuevo
        elementos.push(elemento);

    }else{

        //Crear un Array con la peli nueva
        elementos = [elemento];

    }

    //Guardar en el localStorage
    localStorage.setItem(clave, JSON.stringify(elementos));

    //Devolver objeto guardado
    return elemento;
}