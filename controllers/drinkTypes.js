const { response } = require('express');
const DrinkTypes = require('../models/drinkType');

const getDrinkTypes = async(req, res = response) => {

    const drinkType = await DrinkTypes.find()

                            
    res.json({
        ok: true,
        drinkType
    })
}

const createDrinkType = async (req, res = response) => {

    const uid = req.uid;
    const drinkType = new DrinkTypes({
        ...req.body
    });


    try {

        const drinkTypeDB = await drinkType.save();

        
        res.json({
            ok: true,
            drinkType: drinkTypeDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}
 
const deleteDrinkType = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const drinkType = await DrinkTypes.findById( id );

        if ( !drinkType ) {
            return res.status(404).json({
                ok: true,
                msg: 'DrinkTypes no encontrado por id',
            });
        }

        await DrinkTypes.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'DrinkTypes borrado'
        }); 

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}



module.exports = {
    getDrinkTypes,
    createDrinkType, 
    deleteDrinkType
}