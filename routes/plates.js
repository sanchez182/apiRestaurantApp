/*
    Medicos
    ruta: '/api/plates'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getPlates,
    createPlate,
    updatePlate,
    deletePlate
} = require('../controllers/plates')


const router = Router();

router.get( '/', getPlates );

router.post( '/',
    [
        validarJWT, 
        check('typeFoodID','El typeFood id debe de ser válido').isMongoId(),
        validarCampos
    ], 
    createPlate 
);

router.put( '/:id',
    [
        validarJWT,
        check('nombre','El nombre del médico es necesario').not().isEmpty(),
        check('hospital','El hospital id debe de ser válido').isMongoId(),
        validarCampos
    ],
    updatePlate
);

router.delete( '/:id',
    deletePlate
);



module.exports = router;



