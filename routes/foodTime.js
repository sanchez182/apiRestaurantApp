/*
    Medicos
    ruta: '/api/foodTime'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getFoodTime,
    createFoodTime,
    deleteFoodTime
} = require('../controllers/foodTime')


const router = Router();

router.get( '/', getFoodTime );

router.post( '/',
    [
        validarJWT, 
        check('foodTimeName','El nombre es obligatorio').notEmpty(),
        validarCampos
    ], 
    createFoodTime 
);
 

router.delete( '/:id',
deleteFoodTime
);



module.exports = router;



