const express = require("express");
const { PORT} = require('./config/index.js');
const {dbConnection} = require('./database/config.js');
const propertyRoutes = require('./routes/propertyRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const uploadRoutes = require('./routes/uploadRoutes');
const cors = require('cors');


// Crear el servidor de express
const app = express();

//Configurar CORS
app.use(cors());

//Inicializacion de Base de Datos.
dbConnection();

// Directorio público
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

//Rutas

app.use('/api',propertyRoutes);
app.use('/api',userRoutes);
app.use('/api/login',authRoutes);
app.use('/api/upload',uploadRoutes);

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT );
});