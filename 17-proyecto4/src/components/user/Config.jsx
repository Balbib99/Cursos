/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth';
import { Global } from '../../helpers/Global';
import avatar from '../../assets/img/user.png'
import { SerializeForm } from '../../helpers/SerializeForm';

export const Config = () => {

    const token = localStorage.getItem("token");

    const {auth, setAuth} = useAuth();

    const [saved, setSaved] = useState("not_saved");

    const updateUser = async(e) => {
        e.preventDefault();

        // Recoger datos del formulario
        let newDataUser = SerializeForm(e.target);
        
        // Borrar propiedad innecesaria
        delete newDataUser.file0;

        // Actualizar usuario en la base de datos
        const request = await fetch(Global.url + "user/update", {
            method: "PUT",
            body: JSON.stringify(newDataUser),
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })

        // Recogemos el objeto que viene de la petición y lo convertimos
        // para poder trabajar con él
        const data = await request.json();

        // Comprobamos el estado de la actualización
        if (data.status == "success" && data.user) {
            
            // Borramos la propiedad password para que no sea visible por el usuario
            delete data.user.password;

            // Actalizamos los datos del usuario para que se vean por pantalla
            setAuth(data.user);

            // Confirmamos que se ha realizado la actualización
            setSaved("saved");

        } else {
            setSaved("error");
        }

        // Subida de imagenes
        const fileInput = document.querySelector("#file");

        if (data.status == "success" && fileInput.files[0]) {
            
            // Recoger fichero a subir
            const formData = new FormData();
            formData.append('file0', fileInput.files[0])

            // Petición para enviar el fichero
            const uploadRequest = await fetch(Global.url + "user/upload", {
                method: "POST",
                body: formData,
                headers: {
                    "Authorization": token
                }
            });

            const uploadData = await uploadRequest.json();

            if (uploadData.status == "success" && uploadData.user) {
                delete uploadData.user.password;

                setAuth(uploadData.user);
                setSaved("saved");
            } else {
                setSaved("error");
            }

        }

    }

    return (
        <>
            <header className="content__header content__header--public">
                <h1 className="content__title">Ajustes</h1>
            </header>

            <div className="content__posts">

                {saved == "saved" ?
                    <strong className='alert alert-success'> Usuario actualizado correctamente !! </strong>
                    : ""}

                {saved == "error" ?
                    <strong className='alert alert-danger'>Usuario no se ha actualizado !!</strong>
                    : ""}

                <form className='config-form' onSubmit={updateUser}>
                    <div className='form-group'>
                        <label htmlFor='name'>Nombre</label>
                        <input type='text' name='name' defaultValue={auth.name}/>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='surname'>Apellidos</label>
                        <input type='text' name='surname' defaultValue={auth.surname}/>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='nick'>Nick</label>
                        <input type='text' name='nick' defaultValue={auth.nick}/>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='bio'>Bio</label>
                        <textarea name='bio' defaultValue={auth.bio}/>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='email'>Correo electrónico</label>
                        <input type='email' name='email' defaultValue={auth.email}/>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='password'>Contraseña</label>
                        <input type='password' name='password' />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='file0'>Avatar</label>
                        <div className='avatar'>
                            {/* Mostrar imagen */}
                            {auth.image != "default.png" && <img src={Global.url + "user/avatar/" + auth.image} className="container-avatar__img" alt="Foto de perfil" />}
                            {auth.image == "default.png" && <img src={avatar} className="container-avatar__img" alt="Foto de perfil" />}
                        </div>
                        
                        <br />
                        <input type='file' name='file0' id="file" />
                    </div>

                    <br />
                    <input type='submit' value="Guardar" className='btn btn-success' />

                </form>

            </div>
        </>
    )
}
