const { response } = require('express');
const FoodType = require('../models/foodType');

const getFoodType = async(req, res = response) => {

    const foodType = await FoodType.find()

                            
    res.json({
        ok: true,
        foodType
    })
}

const createFoodType = async (req, res = response) => {

    const uid = req.uid;
    const foodType = new FoodType({
        ...req.body
    });


    try {

        const foodTypeDB = await foodType.save();

        
        res.json({
            ok: true,
            foodType: foodTypeDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}
 
const deleteFoodType = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const foodType = await FoodType.findById( id );

        if ( !foodType ) {
            return res.status(404).json({
                ok: true,
                msg: 'FoodType no encontrado por id',
            });
        }

        await FoodType.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'FoodType borrado'
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
    getFoodType,
    createFoodType, 
    deleteFoodType
}