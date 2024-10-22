/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import useAuth from '../../hooks/useAuth';
import { Global } from '../../helpers/Global';
import avatar from '../../assets/img/user.png'
import { NavLink } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';

// Creamos este componente para que contenga toda la lógica del listado de usuarios
export const UserList = ({ users, getUsers, following, setFollowing, more, loading, page, setPage }) => {

    const { auth } = useAuth();

    const follow = async (userId) => {

        // Petición al backend para guardar el follow
        const request = await fetch(Global.url + "follow/save/", {
            method: "POST",
            body: JSON.stringify({ followed: userId }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });

        const data = await request.json();

        // Cuando esté todo correcto
        if (data.status == "success") {

            // Actualizar estado de following, agregando el nuevo follow
            setFollowing([...following, userId])

        }

    }

    const unfollow = async (userId) => {

        // Petición al backend para borrar el follow
        const request = await fetch(Global.url + "follow/unfollow/" + userId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });

        const data = await request.json();

        // Cuando esté todo correcto
        if (data.status == "success") {

            // Actualizar estado de following
            // filtrando los datos para eliminar el antiguo userId
            // que acaba de dejar de seguir
            let filterFollowings = following.filter(followingUserId => userId !== followingUserId);

            setFollowing(filterFollowings);

        }

    }

    // Suma una pagina cada vez que se le da al botón "Ver mas personas"
    const nextPage = () => {
        let next = page + 1;

        setPage(next);

        getUsers(next);
    }

    return (
        <>
            <div className="content__posts">

                {users.map(user => {
                    return (
                        <article key={user._id} className="posts__post">

                            <div className="post__container">

                                <div className="post__image-user">
                                    <NavLink to={"/social/profile/" + user._id} className="post__image-link">
                                        {user.image != "default.png" && <img src={Global.url + "user/avatar/" + user.image} className="post__user__img" alt="Foto de perfil" />}
                                        {user.image == "default.png" && <img src={avatar} className="post__user__img" alt="Foto de perfil" />}
                                    </NavLink>
                                </div>

                                <div className="post__body">

                                    <div className="post__user-info">
                                        <NavLink to={"/social/profile/" + user._id} className="user-info__name">{user.name} {user.surname}</NavLink>
                                        <span className="user-info__divider"> | </span>
                                        <NavLink to={"/social/profile/" + user._id} className="user-info__create-date"><ReactTimeAgo date={user.create_at} locale='es-ES'/></NavLink>
                                    </div>

                                    <h4 className="post__content">{user.bio}</h4>

                                </div>

                            </div>


                            {user._id != auth._id &&
                                < div className="post__buttons">

                                    {!following.includes(user._id) &&

                                        <button className="post__button post__button__green"
                                            onClick={() => follow(user._id)}>
                                            Seguir
                                        </button>
                                    }
                                    {following.includes(user._id) &&
                                        <button className="post__button"
                                            onClick={() => unfollow(user._id)}>
                                            Dejar de seguir
                                        </button>
                                    }

                                </div>
                            }

                        </article>
                    )
                })}

            </div>

            {loading ? <div>Cargando...</div> : ""}

            {
                more &&
                <div className="content__container-btn">
                    <button className="content__btn-more-post" onClick={nextPage}>
                        Ver mas personas
                    </button>
                </div>
            }
        </>
    )
}
