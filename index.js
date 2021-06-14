require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );

// Base de datos
dbConnection();

// Directorio público
app.use( express.static('public') );


// Rutas
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/hospitales', require('./routes/hospitales') );
app.use( '/api/restaurants', require('./routes/restaurants') );
app.use( '/api/plates', require('./routes/plates') );
app.use( '/api/foodTime', require('./routes/foodTime') );
app.use( '/api/foodType', require('./routes/foodType') );
app.use( '/api/drinktypes', require('./routes/drinkTypes') );
app.use( '/api/medicos', require('./routes/medicos') );
app.use( '/api/todo', require('./routes/busquedas') );
app.use( '/api/auth', require('./routes/auth') );
app.use( '/api/upload', require('./routes/uploads') );



app.listen( process.env.PORT || 3000, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT );
});

