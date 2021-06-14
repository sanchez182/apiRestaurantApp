const { response } = require('express');
const FoodTime = require('../models/foodTime');

const getFoodTime = async(req, res = response) => {

    const foodTime = await FoodTime.find()

                            
    res.json({
        ok: true,
        foodTime
    })
}

const createFoodTime = async (req, res = response) => {

    const uid = req.uid;
    const foodTime = new FoodTime({
        ...req.body
    });


    try {

        const foodTimeDB = await foodTime.save();

        
        res.json({
            ok: true,
            foodTime: foodTimeDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}
 
const deleteFoodTime = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const foodTime = await FoodTime.findById( id );

        if ( !foodTime ) {
            return res.status(404).json({
                ok: true,
                msg: 'FoodTime no encontrado por id',
            });
        }

        await FoodTime.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'FoodTime borrado'
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
    getFoodTime,
    createFoodTime, 
    deleteFoodTime
}