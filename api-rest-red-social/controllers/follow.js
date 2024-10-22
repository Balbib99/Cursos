// Importar modulos

// Importamos el modelo de Follow
const Follow = require("../models/follow");

// Importamos el modelo de User
const User = require("../models/user");

const mongoosePaginate = require("mongoose-pagination");

const followService = require("../services/followUserIds");

// Acciones de prueba
const pruebaFollow = (req, res) => {
    return res.status(200).send({
        message: "mensaje enviado desde: controllers/user.js"
    })
}

// Acción de guardar un follow (accion de seguir)
const save = (req, res) => {

    // Conseguir datos por body
    const params = req.body;

    // Sacar id del usuario identificado
    const identity = req.user;

    // Crear objeto con modelo follow
    let userToFollow = new Follow({
        user: identity.id,
        followed: params.followed
    });

    // Guardar objeto en bbdd
    userToFollow.save().then((followStored) => {

        return res.status(200).send({
            status: "success",
            message: "Usuario seguido correctamente",
            identity: req.user,
            follow: followStored
        })

    }).catch((error) => {

        return res.status(500).send({
            status: "error",
            message: "No se ha podido seguir al usuario"
        })

    })
}

// Accion de borrar un follow (accion dejar de seguir)
const unfollow = (req, res) => {

    // Recoger el id del usuario identificado
    const userId = req.user.id;
    console.log(userId);

    // Recoger el id del usuario que sigo y quiero dejar de seguir
    const followedId = req.params.id;
    console.log(followedId);

    // Find de las coincidencias y eliminamos el follow que marquemos
    Follow.findOneAndDelete({
        "user": userId,
        "followed": followedId
    }).then((followDeleted) => {

        if (!followDeleted) {
            return res.status(404).send({
                status: "error",
                message: "El seguimiento no existe."
            });
        }

        return res.status(200).send({
            status: "success",
            message: "Unfollow exitoso",
            followDeleted
        });

    }).catch((error) => {

        return res.status(500).send({
            status: "error",
            message: "No se ha podido procesar el unfollow"
        });

    })

}

// Accion listado de usuarios que estoy siguiendo
const following = (req, res) => {

    // Sacra el id del usuario identificado
    let userId = req.user.id;

    // Comprobar si me llega el id por parametro en url
    if (req.params.id) userId = req.params.id;

    // Comprobar si me llega la pagina, si no la pagina 1
    let page = 1;

    if (req.params.page) page = req.params.page;

    // Usuarios por pagina quiero mostrar
    const itemsPerPage = 5;

    // Find and follow, popular datos de los usuarios y paginar con mongoose paginate
    Follow.find({ user: userId })
        .populate("user followed", "-password -role -__v -email") // Con populate() sacamos toda la información de los objetos que nos devuelva
        .paginate(page, itemsPerPage)
        .then(async (follows) => {

            // Listado de usuarios de trinity, y soy balbino
            // Sacar un array de ids de los usuarios que me siguen y los que sigo como victor
            let followUserIds = await followService.followUserIds(req.user.id);

            Follow.find({ user: userId }).then((total) => {

                return res.status(200).send({
                    status: "success",
                    message: "Listado de usuarios que estoy siguiendo",
                    follows,
                    total: total.length,
                    pages: Math.ceil(total.length / itemsPerPage),
                    user_following: followUserIds.following,
                    user_follow_me: followUserIds.followers
                });

            })

        }).catch((error) => {

            return res.status(500).send({
                status: "success",
                message: "Ha ocurrido un error"
            });

        })
}

// Accion listado de usuarios que me siguen
const followers = (req, res) => {

    // Sacra el id del usuario identificado
    let userId = req.user.id;

    // Comprobar si me llega el id por parametro en url
    if (req.params.id) userId = req.params.id;

    // Comprobar si me llega la pagina, si no la pagina 1
    let page = 1;

    if (req.params.page) page = req.params.page;

    // Usuarios por pagina quiero mostrar
    const itemsPerPage = 5;

    // Find and follow, popular datos de los usuarios y paginar con mongoose paginate
    Follow.find({ "followed": userId })
        .populate("user", "-password -role -__v -email") // Con populate() sacamos toda la información de los objetos que nos devuelva
        .paginate(page, itemsPerPage)
        .then(async (follows) => {

            // Listado de usuarios de trinity, y soy balbino
            // Sacar un array de ids de los usuarios que me siguen y los que sigo como victor
            let followUserIds = await followService.followUserIds(req.user.id);

            Follow.find({ "followed": userId }).then((total) => {

                return res.status(200).send({
                    status: "success",
                    message: "Listado de usuarios que me siguen",
                    follows,
                    total: total.length,
                    pages: Math.ceil(total.length / itemsPerPage),
                    user_following: followUserIds.following,
                    user_follow_me: followUserIds.followers
                });

            })

        }).catch((error) => {

            return res.status(500).send({
                status: "success",
                message: "Ha ocurrido un error"
            });

        })
}

// Exportar acciones
module.exports = {
    pruebaFollow,
    save,
    unfollow,
    followers,
    following
}