const { validarArticulo } = require("../helpers/validar");
const Articulo = require("../modelos/Articulo");
const fs = require("fs");
const path = require("path");


const prueba = (req, res) => {

    return res.status(200).json({
        mensaje: "Soy una acción de prueba en mi controlador de articulos"
    })

}

const curso = (req, res) => {

    console.log("Se ha ejecutando el endpoint probando");

    return res.status(200).send({
        curso: "Master en React",
        autor: "Balbino Martinez",
        url: "victorroblesweb.es/master-react"
    });

}

const crear = async (req, res) => {

    // Recoger los parámetros por POST a guardar
    let parametros = req.body;

    // Validar datos
    try {

        validarArticulo(parametros);

    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        })
    }

    // Crear el objeto a guardar
    const articulo = new Articulo(parametros);

    // Asignar valores a objeto basado en el modelo (manual o automático)
    // articulo.titulo = parametros.titulo;

    // Guardar el artículo en la base de datos
    try {
        await articulo.save();

        res.status(200).json({
            status: "success",
            mensaje: "Articulo creado con exito!!",
            articulo: articulo // Importante: si queremos tratar el artículo posteriormente, debemos devolverlo
        })

    } catch (error) {

        // Devolver resultado
        return res.status(400).json({
            status: "error",
            mensaje: "No se ha guardado el articulo"
        })

    }

}

//Listamos todos los articulos, dependiendo de una serie de filtros
const conseguirArticuos = async (req, res) => {

    // Hacemos la busqueda de articulos a través del "find({})"
    // corchetes cuya función es que busque cualquier articulo.

    // Importante!!: Usaremos el "then" y el "catch" para no tener
    // conflictos con los callback.
    let consulta = Articulo.find({}).sort({ fecha: -1 }); // Ordenamos los articulos por fecha más actualizada

    // Si se detecta el parámetro "ultimos" en la url, este será parseado a número
    // y se le pasará como "limit()" a la función
    if (req.params.ultimos) {
        const limite = parseInt(req.params.ultimos);
        if (!isNaN(limite) && limite > 0) {
            consulta = consulta.limit(limite); // Limitamos a los x primeros artículos
        }
    }

    // Creamos otra constante en la que guardemos la consulta final con su catch en cuestión
    // y ya tendremos nuestra consulta hecha
    const articulos = await consulta.then((articulos) => {

        return res.status(200).send({
            status: "success",
            parametro_url: req.params.ultimos,
            contador: articulos.length,
            articulos
        })

    }).catch((err) => {

        return res.status(404).json({
            status: "error",
            mensaje: "No se han encontrado articulos!!"
        })

    })

}

// Nos permite sacar un articulo en concreto partiendo de su ID
const uno = (req, res) => {
    // Recoger un id por la url
    let id = req.params.id;

    // Buscar el articulo
    Articulo.findById(id).then((articulo) => {

        // Devolver resultado
        return res.status(200).send({
            status: "success",
            articulo
        })

    }).catch((err) => {

        // Si no existe devolver el error
        return res.status(404).json({
            status: "error",
            mensaje: "No se han encontrado articulos!!"
        })

    })
}

const borrar = (req, res) => {
    // Recoger un id por la url
    let articulo_id = req.params.id;

    Articulo.findOneAndDelete({
        _id: articulo_id
    }).then((articulo_borrado) => {

        // Devolver resultado
        return res.status(200).send({
            status: "success",
            articulo_borrado,
            mensaje: "Metodo de borrar"
        })

    }).catch((err) => {

        // Si existe algún error o no existe el articulo que se quiere borrar
        return res.status(404).json({
            status: "error",
            mensaje: "Error al borrar"
        })

    })
}

const editar = (req, res) => {

    // Recoger un id por la url
    let articulo_id = req.params.id;

    // Recoger datos del body
    let parametros = req.body;

    // Validar datos
    try {

        validarArticulo(parametros);

    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        })
    }

    // Buscar y actualizar articulo

    // {new: true} => nos sirve para que el método nos devuelva en todo caso el articulo ya actualizado
    // y podamos así mostrarlo posteriormente; (si hiciesemos '{new: false} o no pusieramos nada', nos devolveria el objeto
    // que hemos actualizado pero con los datos antiguos)
    Articulo.findOneAndUpdate({ _id: articulo_id }, req.body, { new: true }).then((articulo_actualizado) => {

        // Devolver resultado
        return res.status(200).send({
            status: "success",
            articulo_actualizado
        })

    }).catch((err) => {

        // Si existe algún error o no existe el articulo que se quiere borrar
        return res.status(404).json({
            status: "error",
            mensaje: "Error al actualizar"
        })

    })

}

const subir = (req, res) => {

    // Configurar multer para subida de archivos

    // Recoger el fichero de imagen subido
    // Compruebo que haya mandado yo el archivo, teniendo en cuenta que tiene que existir el file o files
    // Si no existe directamente no sigue con los siguientes procesos y de está forma no saturamos el programa
    if (!req.file && !req.files) {
        return res.status(400).json({
            status: "error",
            mensaje: "Petición invalida"
        })
    }

    // Nombre del archivo
    let nombre_archivo = req.file.originalname;

    // Extensión del archivo
    let extension = nombre_archivo.split("\.")[1];

    // Comprobar extensión correcta
    if (extension != "png" && extension != "jpg" && extension != "jpeg" && extension != "gif") {

        // Borrar archivo y dar respuesta
        fs.unlink(req.file.path, (error) => {
            return res.status(400).json({
                status: "error",
                mensaje: "Imagen invalida"
            })
        })

    } else {

        // Si todo va bien, actualizar el articulo
        // Recoger un id por la url
        let articulo_id = req.params.id;

        // Buscar y actualizar articulo

        // {new: true} => nos sirve para que el método nos devuelva en todo caso el articulo ya actualizado
        // y podamos así mostrarlo posteriormente; (si hiciesemos '{new: false} o no pusieramos nada', nos devolveria el objeto
        // que hemos actualizado pero con los datos antiguos)
        Articulo.findOneAndUpdate({ _id: articulo_id }, { imagen: req.file.filename }, { new: true }).then((articulo_actualizado) => {

            // Devolver resultado
            return res.status(200).send({
                status: "success",
                articulo_actualizado,
                ficher: req.file
            })

        }).catch((err) => {

            // Si existe algún error o no existe el articulo que se quiere borrar
            return res.status(404).json({
                status: "error",
                mensaje: "Error al actualizar"
            })

        })

    }

}

const imagen = (req, res) => {
    let fichero = req.params.fichero;
    let ruta_fisica = "./imagenes/articulos/" + fichero;

    fs.stat(ruta_fisica, (error, existe) => {
        if (existe) {
            return res.sendFile(path.resolve(ruta_fisica));
        } else {
            return res.status(404).json({
                status: "error",
                mensaje: "La imagen no existe",
                existe,
                fichero,
                ruta_fisica
            })
        }
    })
}

const buscador = (req, res) => {
    // Sacar el string de busqueda
    let busqueda = req.params.busqueda;

    // Find OR
    Articulo.find({
        "$or": [
            { "titulo": { "$regex": busqueda, "$options": "i" } },
            { "contenido": { "$regex": busqueda, "$options": "i" } }
        ]
    })
        .sort({ fecha: -1 }) // Orden
        .then((articulos) => {

            if (articulos.length <= 0) {

                return res.status(404).json({
                    status: "error",
                    mensaje: "No se han encontrado articulos"
                })

            } else {

                return res.status(200).json({
                    status: "success",
                    articulos
                })

            }

        }).catch((err) => {

            return res.status(404).json({
                status: "error",
                mensaje: "Ha ocurrido un error"
            })

        })



    // Ejecutar consulta

    // Devolver resultado
}

module.exports = {
    prueba,
    curso,
    crear,
    conseguirArticuos,
    uno,
    borrar,
    editar,
    subir,
    imagen,
    buscador
}