const mongoose = require("mongoose");

const connection = async() => {

    try {
        
        await mongoose.connect("mongodb://127.0.0.1:27017/mi_blog"); // IMPORTANTE!!: SI OCURRE ERROR CON LOCALHOST, CAMBIARLO A LA DIRECCIÓN IP 217.0.0.1

        //Parametros dentro de objeto: (EN CASO DE ERROR DE CONEXIÓN)
        //useNewUrlParser: true
        //useUnifiedTopology: true
        //useCreateIndex: true

        console.log("Conectado correctamente a la base de datos mi_blog !!");

    } catch (error) {
        
        console.log(error);

        throw new Error("No se ha podido conectar a la base de datos !!")

    }

}

module.exports = {
    connection
}