// Servidor de Express
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');
const cors     = require('cors');

const Sockets  = require('./sockets');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {

        this.app  = express();
        this.port = process.env.PORT;

        // Conectar a DB
        dbConnection();

        // Http server
        this.server = http.createServer( this.app );
        
        // Configuraciones de sockets
        this.io = socketio( this.server, { /* configuraciones */ } );
    }

    middlewares() {
        // Desplegar el directorio público
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) ); 
        // CORS
        this.app.use( cors() );

        
        // Parseo del body
        this.app.use( express.json() );

        // API End Points
        
        this.app.use( '/api/auth', require('../routes/auth') ); 
        this.app.use( '/api/usuarios', require('../routes/usuarios') ); 
        this.app.use( '/api/restaurants', require('../routes/restaurants') ); 
        this.app.use( '/api/plates', require('../routes/plates') );
        this.app.use( '/api/foodTime', require('../routes/foodTime') );
        this.app.use( '/api/foodType', require('../routes/foodType') );
        this.app.use( '/api/drinktypes', require('../routes/drinkTypes') );
    }

    // Esta configuración se puede tener aquí o como propieda de clase
    // depende mucho de lo que necesites
    configurarSockets() {
        new Sockets( this.io );
    }

    execute() {

        // Inicializar Middlewares
        this.middlewares();

        // Inicializar sockets
        this.configurarSockets();

        // Inicializar Server
        this.server.listen( this.port, () => {
            console.log('Server corriendo en puerto:', this.port );
        });
    }

}


module.exports = Server;