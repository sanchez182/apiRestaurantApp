const { response } = require('express');
/* 
const Restaurant = require('../models/restaurant');
 */

const Restaurant = require('../models/restaurant');

const getRestaurants = async(req, res = response) => {

   /*  const restaurants = await Restaurant.find()
                                    .populate('foodTimeList.model','foodTimeName');
 */
    res.json({
        ok: true
       // restaurants
    })
}

const createRestaurant = async(req, res = response) => {

    const uid = req.uid;
   /*  const restaurant = new Restaurant({ 
        ...req.body 
    }); */

    try {
        
   /*      const restaurantDB = await restaurant.save();
        
 */
        res.json({
            ok: true
          //  ,restaurant: restaurantDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    


}

const updateRestaurant = async (req, res = response) => {

    const id  = req.params.id;
    const uid = req.uid;

    try {
        
/*         const restaurant = await Restaurant.findById( id );

        if ( !restaurant ) {
            return res.status(404).json({
                ok: true,
                msg: 'Restaurante no encontrado por id',
            });
        }

        const cambiosRestaurant = {
            ...req.body
        }

        const restaurantActualizado = await Restaurant.findByIdAndUpdate( id, cambiosRestaurant, { new: true } );


        res.json({
            ok: true,
            restaurant: restaurantActualizado
        }) */

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}
/* 
const borrarHospital = async(req, res = response) => {

    const id  = req.params.id;

    try {
        
        const hospital = await Hospital.findById( id );

        if ( !hospital ) {
            return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado por id',
            });
        }

        await Hospital.findByIdAndDelete( id );


        res.json({
            ok: true,
            msg: 'Hospital eliminado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
} */



module.exports = {
    getRestaurants,
    createRestaurant,
    updateRestaurant
}