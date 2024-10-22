// Importar modelo
const Publication = require("../models/publication");

// Importar módulos
const fs = require("fs");
const path = require("path");

// Importar Servicios
const followServices = require("../services/followUserIds")

// Acciones de prueba
const pruebaPublication = (req, res) => {
    return res.status(200).send({
        message: "mensaje enviado desde: controllers/user.js"
    })
}

// Guardaar publicaciones
const save = (req, res) => {

    // Recoger datos del body
    const params = req.body;

    // Si no me llegan, dar respuesta negativa
    if (!params.text) return res.status(400).send({ status: "error", message: "Deves enviar el texto de la publicación." });

    // Crear y rellenar el objeto del modelo
    let newPublication = new Publication(params);
    newPublication.user = req.user.id;

    // Guardar objeto en bbdd
    newPublication.save().then((publicationStored) => {

        if (!publicationStored) {
            return res.status(400).send({ status: "error", message: "No se ha guardado la publicación" });
        }

        // Devolver respuesta
        return res.status(200).send({
            status: "success",
            message: "Publicación guardada",
            publicationStored
        })

    }).catch((error) => {
        return res.status(400).send({ status: "error", message: "Ha habido algún error" });
    })

}

// Sacar una publicación
const detail = (req, res) => {

    // Sacar id de publiccion de la url
    const publicationId = req.params.id;

    // Find con la condicion del id
    Publication.findById(publicationId).then((publicationStored) => {

        if (!publicationStored) {
            return res.status(400).send({ status: "error", message: "No se ha encontrado la publicacion" });
        }

        // Devolver respuesta
        return res.status(200).send({
            status: "success",
            message: "Mostrar publicacion",
            publication: publicationStored
        })

    }).catch((error) => {

        return res.status(400).send({ status: "error", message: "Ha habido algún error" });

    })
}

// Eliminar publicaciones
const remove = (req, res) => {

    // Sacar el id de la publicacion a eliminar
    const publicationId = req.params.id;

    // Find y remove
    Publication.findOneAndDelete({ "user": req.user.id, "_id": publicationId }).then((remove) => {

        if (!remove) {
            return res.status(404).send({
                status: "error",
                message: "No existe la publicación"
            })
        }

        // Devolver respuesta
        return res.status(200).send({
            status: "success",
            message: "Publicación eliminada exitosamente",
            publication: publicationId
        })

    }).catch((error) => {
        return res.status(500).send({
            status: "error",
            message: "Ocurrió un error al eliminar la publicación"
        })
    })
}

// Listar publicaciones de un usuario
const user = (req, res) => {

    // Sacar el id del usuario
    const userId = req.params.id

    // Controlar el numero de la pagina
    let page = 1;

    if (req.params.page) page = req.params.page;

    const itemsPerPage = 3;

    // Find, populate, ordenar, paginar
    Publication.find({ "user": userId })
        .sort("-create_at")
        .populate("user", "-password -__v -role")
        .paginate(page, itemsPerPage)
        .then((publications) => {


            Publication.find({ "user": userId })
                .then((total) => {

                    if (publications <= 0) {
                        return res.status(404).send({
                            status: "error",
                            message: "No existen publicaciones"
                        })
                    }

                    // Devolver respuesta
                    return res.status(200).send({
                        status: "success",
                        message: "Publicaciónes del perfil de un usuario",
                        page,
                        total: total.length,
                        pages: Math.ceil(total.length / itemsPerPage),
                        publications
                    })

                });

        }).catch((error) => {

            return res.status(500).send({
                status: "error",
                message: "Ocurrió un error"
            })

        })

}

// Subir ficheros
const upload = (req, res) => {

    // Sacar publication id
    const publicationId = req.params.id;

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
    Publication.findOneAndUpdate({ "user": req.user.id, "_id": publicationId }, { file: req.file.filename }, { new: true }).exec().then((publicationUpdated) => {

        if (!publicationUpdated) {
            return res.status(404).send({
                status: "error",
                message: "Usuario no encontrado",
            });
        }

        // Devolver respuesta
        return res.status(200).send({
            status: "success",
            publication: publicationUpdated,
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

// Devolver archivos multimendia imagenes
const media = (req, res) => {

    // Sacar el parámetro de la url
    const file = req.params.file;

    // Montar el path real de la imagen
    const filePath = "./uploads/publications/" + file;

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

// Listar todas las publicaciones (FEED)
const feed = async (req, res) => {

    // Sacar la pagina actual
    let page = 1;

    if (req.params.page) page = req.params.page;

    // Establecer el numero de elementos por página
    let itemsPerPage = 3;

    // Sacar un array de identificadores de usuarios que yo sigo como usuario identificado
    try {
        const myFollows = await followServices.followUserIds(req.user.id);

        // Find a publicaciones in, ordenar, popular y paginar
        Publication.find({
            "user": myFollows.following // De esta forma decimos que saque las publicaciones de todos los usuarios que sigo
        }).populate("user", "nick name surname image")
            .sort("-create_at")
            .paginate(page, itemsPerPage)
            .then((publications) => {

                Publication.find({ "user": myFollows.following }).then((total) => {
                   
                    if (publications <= 0) {

                        return res.status(200).send({
                            status: "success",
                            message: "Los usuarios que sigues no tienen publicaciones"
                        })
    
                    }
    
                    return res.status(200).send({
                        status: "success",
                        message: "Feed de publicaciones",
                        following: myFollows.following,
                        total: total.length,
                        page,
                        pages: Math.ceil(total.length / itemsPerPage),
                        publications
                    });

                });

            })

    } catch (error) {

        return res.status(500).send({
            status: "error",
            message: "No se han listado las publicaciones del feed"
        })

    }

}

// Exportar acciones
module.exports = {
    pruebaPublication,
    save,
    detail,
    remove,
    user,
    upload,
    media,
    feed
}