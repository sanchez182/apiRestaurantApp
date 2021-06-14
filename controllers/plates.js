const { response } = require('express');
const Plate = require('../models/plate');

const getPlates = async(req, res = response) => {

    const plates = await Plate.find()
                                .populate('restaurant','name')
                                .populate('foodType','foodTypeName')
                                .populate('foodTime','foodTimeName')

                            
    res.json({
        ok: true,
        plates
    })
}

const createPlate = async (req, res = response) => {

    const uid = req.uid;
    const plate = new Plate({
        ...req.body
    });


    try {

        const plateDB = await plate.save();

        
        res.json({
            ok: true,
            plate: plateDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const updatePlate = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const plate = await Plate.findById( id );

        if ( !plate ) {
            return res.status(404).json({
                ok: true,
                msg: 'Plate no encontrado por id',
            });
        }

        const cambiosPlate = {
            ...req.body,
            usuario: uid
        }

        const plateActualizado = await Plate.findByIdAndUpdate( id, cambiosPlate, { new: true } );


        res.json({
            ok: true,
            plate: plateActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const deletePlate = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const plate = await Plate.findById( id );

        if ( !plate ) {
            return res.status(404).json({
                ok: true,
                msg: 'Plate no encontrado por id',
            });
        }

        await Plate.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Plate borrado'
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
    getPlates,
    createPlate,
    updatePlate,
    deletePlate
}