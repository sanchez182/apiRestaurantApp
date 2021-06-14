/*
    Medicos
    ruta: '/api/foodType'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getFoodType,
    createFoodType,
    deleteFoodType
} = require('../controllers/foodType')


const router = Router();

router.get( '/', getFoodType );

router.post( '/',
    [
        validarJWT, 
        check('foodTypeName','El nombre es obligatorio').notEmpty(),
        validarCampos
    ], 
    createFoodType 
);
 

router.delete( '/:id',
deleteFoodType
);



module.exports = router;



