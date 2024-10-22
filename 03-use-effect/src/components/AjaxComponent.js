import React, { useEffect, useState } from 'react'

export const AjaxComponent = () => {

    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);

    const getUsuariosEstaticos = () => {
        setUsuarios([
            {
                "id": 1,
                "email": "balbino@reqres.in",
                "first_name": "Balbino",
                "last_name": "Martinez"
            },
            {
                "id": 2,
                "email": "lindsay.ferguson@reqres.in",
                "first_name": "Lindsay",
                "last_name": "Ferguson",
                "avatar": "https://reqres.in/img/faces/8-image.jpg"
            },
            {
                "id": 3,
                "email": "tobias.funke@reqres.in",
                "first_name": "Tobias",
                "last_name": "Funke",
                "avatar": "https://reqres.in/img/faces/9-image.jpg"
            }
        ])
    }

    // Petición a la API solo con fetch
    const getUsuariosAjaxPms = () => {
        fetch("https://reqres.in/api/users?page=1")
            .then(respuesta => respuesta.json())
            .then(resultado_final => {

                setUsuarios(resultado_final.data)

                console.log(usuarios);

            },
                error => {
                    console.log(error);
                })
    }

    //Peticion a través de async/await
    const getUsuariosAjaxAW = () => {

        setTimeout(async () => {

            try {

                const peticion = await fetch("https://reqres.in/api/users?page=2");

                const {data} = await peticion.json();
        
                setUsuarios(data);
    
                //Una vez cargan los datos pasamos a falso el "cargando datos"
                setCargando(false);

            } catch (error) {
                console.log("error");
            }

        }, 1000)

    }

    useEffect(() => {
        // getUsuariosEstaticos();
        // getUsuariosAjaxPms();
        getUsuariosAjaxAW();
    }, []);

    if (cargando === true) {

        return(
            <div className='cargando'>
                Cargando datos....
            </div>
        );   

    } else {

        return (
            <div>
                <h2>Listado de usuarios via Ajax</h2>
    
                <ol className='usuarios'>
                    {
                        usuarios.map(usuario => {
                            return <li key={usuario.id}><img src={usuario.avatar}/>{usuario.first_name} {usuario.last_name}</li>
                        })
                    }
                </ol>
            </div>
        );

    }
}
