const { connection } = require("./database/connection")
const express = require("express");
const cors = require("cors");

//Inicializar app
console.log("App de node arrancada");

//Conectar a la base de datos
connection();

//Crear servidor Node
const app = express();
const puerto = 3900;

//Configurar cors
app.use(cors());

//Convertir body a objeto js (parseamnos cualquier petición que nos llegue automáticamente)
app.use(express.json()); //recibir datos con content-type app/json
app.use(express.urlencoded({extended: true})); // recibir datos por form-urlencoded

// RUTAS
const rutas_articulo = require("./rutas/Articulo");

app.use("/api", rutas_articulo);


//Rutas prueba harcodeadas
app.get("/probando", (req, res) => {

    console.log("Se ha ejecutando el endpoint probando");

    return res.status(200).send({
        curso: "Master en React",
        autor: "Balbino Martinez",
        url: "victorroblesweb.es/master-react"
    });
    
})

app.get("/", (req, res) => {

    console.log("Se ha ejecutando el endpoint /");

    return res.status(200).send(`
        <h1>Empezando a crear una api rest con node</h1>
    `);
    
})

// Crear servidor y escuchar peticione http
app.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto "+puerto);
})