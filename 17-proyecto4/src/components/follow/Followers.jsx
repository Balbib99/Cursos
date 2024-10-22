/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Global } from '../../helpers/Global'
import { UserList } from '../user/UserList'
import { useParams } from 'react-router-dom';
import { GetProfile } from '../../helpers/GetProfile';

export const Followers = () => {

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  const [userProfile, setUserProfile] = useState({});

  const params = useParams();

  useEffect(() => {
    getUsers(1);

    // Usamos el helper para recoger los datos del perfil logueado
    GetProfile(params.userId, setUserProfile)
  }, [])

  const getUsers = async (nextPage = 1) => {

    // Efecto de carga
    setLoading(true);

    // Sacamos el id del usuario
    const userId = params.userId;

    // Petición para sacar usuarios
    const request = await fetch(Global.url + "follow/followers/" + userId + "/" + nextPage, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    })

    const data = await request.json();

    setLoading(false);

    // Recorrer y limpiar follows para quedarme con followed
    let cleanUsers = [];
    
    data.follows.forEach(follow => {
        cleanUsers = [...cleanUsers, follow.user]
    });
    data.users = cleanUsers;

    // Crear estado para poder listarlos
    if (data.users && data.status == "success") {

      let newUsers = data.users;

      if (users.length >= 1) {
        newUsers = [...users, ...data.users]
      }

      setUsers(newUsers);
      setFollowing(data.user_following);
      setLoading(false);

      // Paginación
      if (users.length >= (data.total - data.users.length)) {
        setMore(false);
      }
    }

  }




  return (
    <section className="layout__content">

      <header className="content__header">
        <h1 className="content__title">Seguidores de {userProfile.name} {userProfile.surname}</h1>
      </header>

      <UserList users={users} getUsers={getUsers}
        following={following} setFollowing={setFollowing}
        more={more}
        loading={loading}
        page={page} setPage={setPage}
      />

    </section >
  )
}
