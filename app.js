const express = require("express");
const { PORT} = require('./config/index.js');
const {dbConnection} = require('./database/config.js');
const propertyRoutes = require('./routes/propertyRoutes.js');


// Crear el servidor de express
const app = express();

//Inicializacion de Base de Datos.
dbConnection();

// Lectura y parseo del body
app.use( express.json() );

//Rutas

app.use('/api',propertyRoutes);

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT );
});