import { useState } from "react";

export const useForm = ( objetoInicial = {} ) => {

    const [formulario, setFormulario] = useState({});

    //se encarga de recoger todos los datos del formulario
    const serializaFormualrio = (formulario) => {

        //Recogemos los datos y lo convertimos en FormData
        const formData = new FormData(formulario);
        
        //Creamos un nuevo objeto para introducir los datos
        const objetoCompleto = {};

        //Creamos un bucle que recorra todo el FormData y coja los datos
        //de "name" y de "value", y los vaya guardanto en el nuevo objeto
        //"objetoCompleto"
        for(let [name, value] of formData){
            objetoCompleto[name] = value;
        }

        //Devuelve el objeto con los valores actualizados
        return objetoCompleto;
    }

    const enviado = (e) => {
        e.preventDefault();
        
        // let curso = {
        //     titulo: e.target.titulo.value,
        //     anio: e.target.anio.value,
        //     descripcion: e.target.descripcion.value,
        //     autor: e.target.autor.value,
        //     email: e.target.email.value
        // }

        //Crea el objeto curso y serializa el formulario a través de
        //la función
        let curso = serializaFormualrio(e.target);

        //Cambia el estado del formulario para que esté actualizado
        setFormulario(curso);

        document.querySelector(".codigo").classList.add("enviado");
    }

    const cambiado = ({target}) => {
        const {name, value} = target;

        setFormulario({
            //Recojo dentro del objeto todo lo que ya había
            ...formulario,
            //añado las propiedades nuevas
            [name]: value
        })
    }

    return {
        formulario: formulario,
        enviado,
        cambiado
    }
}