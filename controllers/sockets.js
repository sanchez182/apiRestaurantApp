const Restaurant = require('../models/restaurant');
const Usuario = require('../models/usuario'); 

const usuarioConectado = async( uid ) => {

    const usuario = await Usuario.findById(uid);
    usuario.online = true;
    await usuario.save();
    
    return usuario;
}

const usuarioDesconectado = async( uid ) => {
    const usuario = await Usuario.findById(uid);
    usuario.online = false;
    await usuario.save();
    
    return usuario;
}


const getUsuarios = async() => {

    const usuarios = await Usuario
        .find()
    /*     .sort('-online'); */

    return usuarios;
}
 
const selectRestaurantTable = async( payload ) => {
    
    try {
        //aca selecciono la mesa del restaurant
        const selectedTable = new Restaurant.updateOne(
            { _id: payload.idRestaurant, "tableList.tableNumer": payload.tableNumer },
            { $set: { "tableList.$.selected" : true } }
         ) ( payload );
        await selectedTable.save();

        return payload.tableNumer;

    } catch (error) {
        console.log(error);
        return false;
    }

} 


module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    getUsuarios,
    selectRestaurantTable
}
