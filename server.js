var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var path = require("path");

var router = express.Router();
var routes = require("./routes");

var app = express();

app.set("port", 8000);

var publicDir = path.join(__dirname, "/public");

// Asignamos el directorio 'public' como estatico
app.use(express.static( publicDir ));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Sirve para poder utilizar metodos put y delete
app.use(methodOverride());

// Asignamos las rutas que crearemos a la aplicacion
app.use( routes( router ) );

// Arrancamos la aplicacion
app.listen(app.get("port"), function () {
    console.log(`Server iniciado en http://localhost:${app.get("port")}/`);
});
