const Restaurant = require('../models/restaurant');
const Usuario = require('../models/usuario'); 

const usuarioConectado = async( uid ) => {

    const usuario = await Usuario.findById(uid);
    usuario.online = true;
    await usuario.save();
    
    return usuario;
}

const usuarioDesconectado = async( uid ) => {
  /*   const usuario = await Usuario.findById(uid);
    usuario.online = false;
    await usuario.save(); */
    
   // return usuario;
    return uid;
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

        const res = await Restaurant.findOneAndUpdate(
            { _id : payload.idRestaurant },
            { $set: { "tableList.$[elem].selected" : payload.isSelected } },
            { projection:{ "name": 1,  "tableList" :  {"$elemMatch": { "tableNumer": payload.tableNumer } }}, arrayFilters: [ { "elem.tableNumer": { $eq: payload.tableNumer } } ] }
         )
        return res

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
