/*
    Medicos
    ruta: '/api/foodType'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getDrinkTypes,
    createDrinkType,
    deleteDrinkType
} = require('../controllers/drinkTypes')


const router = Router();

router.get( '/', getDrinkTypes );

router.post( '/',
    [
        validarJWT, 
        check('drinkTypeName','El nombre es obligatorio').notEmpty(),
        validarCampos
    ], 
    createDrinkType 
);
 

router.delete( '/:id',
deleteDrinkType
);



module.exports = router;



