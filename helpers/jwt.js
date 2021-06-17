const jwt = require('jsonwebtoken');

const generarJWT = ( uid, name ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid, name };

        jwt.sign( payload,  process.env.JWT_SECRET, {
            expiresIn: '2h'
        }, (err, token ) => {

            if ( err ){
                console.log(err);
                reject('No se pudo generar el token');
            }

            resolve( token );

        })


    })
}


const comprobarJWT = ( token = '' ) => {

    try {
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );

        return [ true, uid ];

    } catch (error) {
        return [ false, null ];
    }

}




module.exports = {
    generarJWT,
    comprobarJWT
}