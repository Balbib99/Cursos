import React, { useState } from 'react'

export const FormularioComponent = () => {

    const [usuario, setUsuario] = useState({});

    const conseguirDatosFormulario = e => {
        e.preventDefault();

        let target = e.target;

        let usuario = {
            nombre: target.nombre.value,
            apellido: target.apellido.value,
            genero: target.genero.value,
            biografia: target.biografia.value,
            enviar: target.enviar.value
        }

        console.log(usuario);

        setUsuario(usuario);
    }

    const cambiarDatos = e => {
        let name_del_input = e.target.name;
        let usuario_para_modificar = usuario;

        // usuario_para_modificar[name_del_input] = e.target.value;
    
        setUsuario(estado_previo => {
            return{
                ...estado_previo,
                [name_del_input]: e.target.value
            }
        });

    }

    return (
        <div>
            <h1>Formularios con React</h1>

            {/* Si existe la biografia y esta tiene al menos un caracter, se mostrará la información */}
            {usuario.enviar &&
                (
                    <div className='info_usuario'>
                        {usuario.nombre} {usuario.apellido} es un {usuario.genero}
                        y su biografia es la siguiente: <p>{usuario.biografia}</p>
                    </div>
                )
            }

            <form onSubmit={conseguirDatosFormulario}>
                <input type='text' placeholder='Nombre' name='nombre' onChange={cambiarDatos}/>
                <input type='text' placeholder='Apellido' name='apellido' onChange={cambiarDatos}/>
                <select name='genero' onChange={cambiarDatos}>
                    <option value="hombre" >Hombre</option>
                    <option value="mujer" >Mujer</option>
                </select>

                <textarea placeholder='Biografia' name='biografia' onChange={cambiarDatos}></textarea>

                <input type='submit' value="Enviar" name='enviar'/>
            </form>
        </div>
    )
}
