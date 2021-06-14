/*
    Hospitales
    ruta: '/api/resaturant'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getRestaurants,
    createRestaurant,
    updateRestaurant
} = require('../controllers/restaurant')


const router = Router();

router.get( '/', getRestaurants );

router.post( '/',
    [
        validarJWT,
        check('name','El nombre del restaurant es necesario').not().isEmpty(),
        validarCampos
    ], 
    createRestaurant 
);

router.put( '/:id',
    [
        validarJWT,
        check('name','El nombre del restaurant es necesario').not().isEmpty(),
        validarCampos
    ],
    updateRestaurant
);



module.exports = router;
