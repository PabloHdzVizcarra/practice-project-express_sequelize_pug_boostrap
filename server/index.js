// Importar express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');
const configs = require('./config');
require('dotenv').config({path: 'variables.env'});

// Configurar express
const app = express();

// Habilitar Pug
app.set('view engine', 'pug');

// Añadir las vistas
app.set('views', path.join(__dirname, './views'));

// Cargar carpeta estatica llamada public
app.use(express.static(path.join(__dirname, '../public')));

// Validar si es modo desarrollo o produccion
const config = configs[app.get('env')];

// Creamos la variable para el sitio web
app.locals.titulo = config.nombresitio;

// Muestra el año actual
app.use((req, res, next) => {
  const fecha = new Date();
  res.locals.fechaActual = fecha.getFullYear();
  res.locals.ruta = req.path;

  return next();
})

// Ejecutamos body parser
app.use(bodyParser.urlencoded({extended: true}));


// Cargar las rutas
app.use('/', routes());

/** Puerto y host para la app */
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
  console.log('El servidor esta funcionando');
});