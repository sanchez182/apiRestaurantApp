const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado,
    selectRestaurantTable,
        usuarioDesconectado,
        getUsuarios } = require('../controllers/sockets');

class Sockets {

    constructor( io ) {
        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async( socket ) => {

         const [ valido, uid ] = comprobarJWT( socket.handshake.query['x-token']  );

        if ( !valido ) {
                console.log('socket no identificado');
                return socket.disconnect();
            }

           // await usuarioConectado( uid );

            // Unir al usuario a una sala de socket.io
          //  socket.join( uid );

            // TODO: Validar el JWT 
            // Si el token no es válido, desconectar

            // TODO: Saber que usuario está activo mediante el UID

            // TODO: Emitir todos los usuarios   
            this.io.emit( 'lista-usuarios', await getUsuarios() )
            // TODO: Socket join, uid

            // TODO: Escuchar cuando se aparta una mesa para un restaurante en especifico
            socket.on( 'seleted-table', async( payload ) => {
          /*       {
                    numberTable: 1,
                    idRestaurant: 1
                } */
                const mensaje = await selectRestaurantTable( payload );
                this.io.to( payload.idRestaurant ).emit( 'seleted-table', mensaje );
            });
            

            // TODO: Disconnect
            // Marcar en la BD que el usuario se desconecto
            // TODO: Emitir todos los usuarios conectados
            socket.on('disconnect', async() => {
                await usuarioDesconectado( uid );
                this.io.emit( 'lista-usuarios', await getUsuarios() )
            })
            
        
        });
    }


}


module.exports = Sockets;