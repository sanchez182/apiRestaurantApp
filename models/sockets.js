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
            let theUid = null;
        if(socket.handshake.query['isClient'] ){
            theUid = socket.handshake.query['uidClient']
             console.log("es cliente")
        }else{
            const [ valido, uid ] = comprobarJWT( socket.handshake.query['x-token']  );
            theUid = uid
        if ( !valido ) {
                console.log('socket no identificado');
                return socket.disconnect();
            }
        }
           // await usuarioConectado( uid );

            // Unir al usuario a una sala de socket.io
            socket.join( theUid );

            // TODO: Validar el JWT 
            // Si el token no es válido, desconectar

            // TODO: Saber que usuario está activo mediante el UID

            // TODO: Emitir todos los usuarios   
           // this.io.emit( 'lista-usuarios', await getUsuarios() )
            // TODO: Socket join, uid

            // TODO: Escuchar cuando se aparta una mesa para un restaurante en especifico
            socket.on( 'selected-table', async( payload ) => {
                const response = await selectRestaurantTable( payload );
                this.io.to( theUid ).emit( 'selected-table',response );
            });
            

            // TODO: Disconnect
            // Marcar en la BD que el usuario se desconecto
            // TODO: Emitir todos los usuarios conectados
            socket.on('disconnect', async() => {
                await usuarioDesconectado( theUid );
              //  this.io.emit( 'lista-usuarios', await getUsuarios() )
            })
            
        
        });
    }


}


module.exports = Sockets;