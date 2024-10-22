// Importar dependencias y módulos

// Carga el modulo de User con el cual ussaremos para hacer el CRUD a la bbdd em el apartado de users
const User = require("../models/user");
// Carga la libreria de encriptación que usaremos para encriptar y desencriptar las contraseñas de los usuarios
const bcrypt = require("bcrypt");
// Lo usaremos para la creación token gracias a la función createToken() que nos encontramos en el archivo jwt.js importado
const jwt = require("../services/jwt");
// Biblioteca con la que podremos manipular el File System y nos servirá para la creación y manipulación de avatares
const fs = require("fs");
// Biblioteca con la que manipulamos las rutas de los archivos y directorios la cual usaremos para hayar la ruta absoluta de los avatares y así mostrarlos
const path = require("path");

const followService = require("../services/followUserIds");

const Follow = require("../models/follow");
const Publication = require("../models/publication");

const {validate} = require("../helpers/validate");

// const { error } = require("console");
// const { param } = require("../routes/user");
// const mongoosePagination = require("mongoose-pagination");

// Acciones de prueba
const pruebaUser = (req, res) => {
    return res.status(200).send({
        message: "mensaje enviado desde: controllers/user.js"
    })
}

// Registro de usuarios
const register = (req, res) => {

    // Recoger datos de la petición
    let params = req.body;

    // Comprobar que me llegan correctamenten (+ validación)
    if (!params.name || !params.email || !params.password || !params.nick) {

        return res.status(400).json({
            status: "error",
            message: "Faltan datos por enviar"
        })

    } else {

        // Validación avanzada
        try {
            
            validate(params);

        } catch (error) {
            return res.status(400).json({
                status: "error",
                message: "Validación no superada"
            })
        }

        // Control usuaarios duplicados
        User.find({
            $or: [
                { email: params.email.toLowerCase() },
                { nick: params.nick.toLowerCase() }
            ]
        }).then(async (users) => {

            if (users && users.length >= 1) {

                return res.status(200).send({
                    status: "success",
                    message: "El usuario ya existe"
                });

            }

            // Cifrar la contraseña
            let pwd = await bcrypt.hash(params.password, 10);
            params.password = pwd;

            // Crear objeto de usuario
            let user_to_save = new User(params);

            // Gusradar usuario en la bbdd
            user_to_save.save().then((userStored) => {

                // Devolver resultado de exito
                res.status(200).json({
                    status: "success",
                    mensaje: "Usuario creado con exito!!",
                    userStored // Importante: si queremos tratar el artículo posteriormente, debemos devolverlo
                });

            }).catch((error) => {

                // Devolver resultado de error
                return res.status(400).json({
                    status: "error",
                    mensaje: "No se ha guardado el usuario"
                });

            });

        }).catch((error) => {

            return res.status(500).json({
                status: "error",
                message: "Error en la consulta de usuarios"
            })

        })

    }
}

// Login de usuario
const login = async (req, res) => {
    // Recorrer parámetros
    let params = req.body;

    if (!params.email || !params.password) {

        return res.status(400).send({
            status: "error",
            message: "Faltan datos por enviar"
        })

    }

    // Buscar en la bbdd si existe
    try {
        const user = await User.findOne({ email: params.email }) //.select({ password: 0 }); // Hacemos el select, para que no nos pase la password junto al objeto

        if (!user) {

            return res.status(500).send({
                status: "error",
                message: "No existe el usuario"
            })

        }

        // Comprobar su contraseña
        const pwd = bcrypt.compareSync(params.password, user.password)

        if (!pwd) {
            return res.status(400).send({
                status: "error",
                message: "No te has identificado correctamente"
            })
        }

        // Conseguir el Token
        const token = jwt.createToken(user);

        // Devolver datos del usuario
        return res.status(200).send({
            status: "success",
            message: "Te has logeado correctamente",
            user: {
                id: user._id,
                name: user.name,
                nick: user.nick
            },
            token
        })

    } catch (error) {

        return res.status(500).send({
            status: "error",
            message: "No existe el usuario"
        })

    }

}

// Perfil de usuario en concreto
const profile = async (req, res) => {

    // Recibir el parámetro del id de usuario por la url
    const id = req.params.id;

    // Consulta para sacar los datos del usuario
    User.findById(id).select("-role -password").exec().then(async(userProfile) => { // Le hacemos el select a esos dos atributos para que no nos los devuelva

        if (!userProfile) {

            return res.status(404).send({
                status: "error",
                message: "No existe el perfil"
            })

        }

        // Info de seguimiento
        const followInfo = await followService.followThisUser(req.user.id, id);

        // Devolver el resultado
        return res.status(200).send({
            status: "success",
            message: "Este es tu perfil",
            user: userProfile,
            following: followInfo.following, // Comprobamos si sigo a la cuenta
            follower: followInfo.followers // Comprobamos si esa cuenta me sigue a mi
        })

    }).catch((error) => {

        return res.status(404).send({
            status: "error",
            message: "Ha ocurrido un error"
        })

    })

}

// Listar usuarios
const list = (req, res) => {

    // Controlar en que página estamos
    let page = 1;

    if (req.params.page) {

        page = req.params.page;

    }

    page = parseInt(page); // Nos aseguramos de que la página sea un número

    // Consulta con mongoose pagination
    let itemsPerPage = 5; // Decidimos cuantos usuarios vamos a querer por página

    User.find()
        .select("-password -email -role -__v")
        .sort('_id')
        .paginate(page, itemsPerPage)
        .then(async(users) => {

            if (!users) {

                return res.status(404).send({
                    status: "error",
                    message: "No se encontraron usuarios",
                    error
                })

            }

            // Info de seguimiento
            const followUserIds = await followService.followUserIds(req.user.id);

            // Devolver resultado (posteriormente info de follows)
            return User.find().then((total) => { // Hacemos una segunda consulta para poder sacar el total de usuarios que hay
                return res.status(200).send({
                    status: "success",
                    users,
                    page,
                    itemsPerPage,
                    total: total.length,
                    pages: Math.ceil(total.length / itemsPerPage), // Dividimos el total de usuarios entre los usuarios por página que caben para hayar las páginas que hay
                    message: "Listado de usuarios",
                    user_following: followUserIds.following,
                    user_follow_me: followUserIds.followers
                })
            })

        })
        .catch((error) => {

            return res.status(500).send({
                status: "error",
                message: "Error en la consulta de usuarios",
                error
            })

        })

}

// Actualizar usuario
const update = (req, res) => {

    // Recoger info del usuario a actualizar
    const userIdentity = req.user;
    const userToUpdate = req.body;

    // Eliminar campos sobrantes
    delete userToUpdate.iat;
    delete userToUpdate.exp;
    delete userToUpdate.role;
    delete userToUpdate.image;

    // Comprobar si el usuario ya existe
    User.find({
        $or: [
            { email: userToUpdate.email.toLowerCase() },
            { nick: userToUpdate.nick.toLowerCase() }
        ]
    }).then(async (users) => {

        let userIsset = false;

        users.forEach(user => {

            if (user && user._id != userIdentity.id) {
                userIsset = true;
            }

        });

        if (userIsset) {

            return res.status(200).send({
                status: "success",
                message: "El usuario ya existe"
            });

        }

        // Si me llega la password, cifrarla
        if (userToUpdate.password) {

            // Cifrar la contraseña
            let pwd = await bcrypt.hash(userToUpdate.password, 10);
            userToUpdate.password = pwd;

        } else {
            delete userToUpdate.password;
        }

        // Buscar y actualizar
        // Una vez comprobamos que el usuario existe, lo actualizaremos a traves del metodo findByIdAndUpdate()
        // en el que necesitaremos: el id del usuario, el objeto del usuario a actualizar y decirle que queremos que nos devuelva
        // el objeto ya actualizado
        User.findByIdAndUpdate({_id: userIdentity.id}, userToUpdate, { new: true }).then((userUpdate) => {

            return res.status(200).send({
                status: "success",
                message: "El usuario se ha actualizado correctamente",
                user: userUpdate
            })

        }).catch((error) => {

            return res.status(500).send({
                status: "error",
                message: "Error al actualizar el usuario",
                error: error.message
            })

        })

    });

}

// Subir imagenes de avatar
const upload = (req, res) => {

    // Recoger el fichero de imagen y comprobar que existe
    if (!req.file) {
        return res.status(404).send({
            status: "error",
            message: "La petición no incluye la imagen"
        })
    }

    // Conseguir el nombre del archivo
    let image = req.file.originalname;

    // Sacar la extensión del archivo
    const extension = image.split("\.")[1];

    // Comprobar extensión
    if (extension != "png" && extension != "jpg" && extension != "jpeg" && extension != "gif") {

        // Si no es correcta, borrar archivo   
        const filePath = req.file.path;
        const fileDelete = fs.unlinkSync(filePath);

        return res.status(400).send({
            status: "error",
            message: "Extensión del fichero invalida"
        })

    }

    // Si si es correcta, guardar la imagen en bbdd (Importante definir el id como '_id')
    User.findOneAndUpdate({ _id: req.user.id }, { image: req.file.filename }, { new: true }).exec().then((userUpdate) => {

        if (!userUpdate) {
            return res.status(404).send({
                status: "error",
                message: "Usuario no encontrado",
            });
        }

        // Devolver respuesta
        return res.status(200).send({
            status: "success",
            user: userUpdate,
            file: req.file
        })

    }).catch((error) => {

        return res.status(500).send({
            status: "error",
            message: "Error en la subida del avatar",
            error: error
        })

    })

}

// Mostrar el avatar del user
const avatar = (req, res) => {

    // Sacar el parámetro de la url
    const file = req.params.file;

    // Montar el path real de la imagen
    const filePath = "./uploads/avatars/" + file;

    // Comprobar que existe
    fs.stat(filePath, (error, exists) => {

        if (!exists) {

            return res.status(404).send({
                status: "error",
                message: "No existe la imagen"
            })

        }

        // Devolver un file
        return res.sendFile(path.resolve(filePath));

    })
}

// Contador de followers, following y publications de un usuario
const counters = async (req, res) => {

    let userId = req.user.id;

    if (req.params.id) {
        userId = req.params.id;
    }

    try {
        const following = await Follow.count({ "user": userId });

        const followed = await Follow.count({ "followed": userId });

        const publications = await Publication.count({ "user": userId });

        return res.status(200).send({
            userId,
            following: following,
            followed: followed,
            publications: publications
        });
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error en los contadores",
            error
        });
    }
}

// Exportar acciones
module.exports = {
    pruebaUser,
    register,
    login,
    profile,
    list,
    update,
    upload,
    avatar,
    counters
}