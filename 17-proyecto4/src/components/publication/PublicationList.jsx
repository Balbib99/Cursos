/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Global } from '../../helpers/Global';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import avatar from '../../assets/img/user.png'
import ReactTimeAgo from 'react-time-ago';

export const PublicationList = ({publications, getPublications, page, setPage, more, setMore, user}) => {

    const { auth } = useAuth();

    const nextPage = () => {
        let next = page + 1;

        setPage(next);

        getPublications(next);

    }

    const deletePublication = async(publicationId) => {
        const request = await fetch(Global.url + "publication/remove/" + publicationId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/jason",
                "Authorization": localStorage.getItem("token")
            }
        })

        const data = await request.json()

        setPage(1);
        setMore(true);
        getPublications(1, true);
    }

    useEffect(() => {
        console.log(publications);
    })

    return (
        <>
            <div className="content__posts">

                {publications.map(publication => {
                    
                    return (
                        <article key={publication._id} className="posts__post">

                            <div className="post__container">

                                <div className="post__image-user">
                                    <NavLink to={"/social/profile/" + publication.user._id} className="post__image-link">
                                        {publication.user.image != "default.png" && <img src={Global.url + "user/avatar/" + publication.user.image} className="post__user__img" alt="Foto de perfil" />}
                                        {publication.user.image == "default.png" && <img src={avatar} className="post__user__img" alt="Foto de perfil" />}
                                    </NavLink>
                                </div>

                                <div className="post__body">

                                    <div className="post__user-info">
                                        <a href="#" className="user-info__name">{publication.user.name + " " + publication.user.surname}</a>
                                        <span className="user-info__divider"> | </span>
                                        <a href="#" className="user-info__create-date"><ReactTimeAgo date={publication.create_at} locale='es-ES'/></a>
                                    </div>

                                    <h4 className="post__content">{publication.text}</h4>

                                    {publication.file && <img src={Global.url + "publication/media/" + publication.file} />}

                                </div>

                            </div>

                            {auth._id == publication.user._id &&
                                <div className="post__buttons">

                                    <button className="post__button" onClick={() => deletePublication(publication._id)}>
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>

                                </div>
                            }

                        </article>
                    );
                })}

            </div>

            {
                more &&
                <div className="content__container-btn">
                    <button className="content__btn-more-post" onClick={nextPage}>
                        Ver mas publicaciones
                    </button>
                </div>
            }
        </>
    )
}
