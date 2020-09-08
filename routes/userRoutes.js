/*
    Ruta: /api/user
*/
const express = require("express");
const { check } = require('express-validator');
const { errorsResponse } = require('../middlewares/errorsResponse');

const userController = require('../controller/userController');
const { checkJWT } = require('../middlewares/jwtMiddleware');


const router = express.Router();


router.get( '/users', userController.getUsers);

router.post( '/user',
    [
        check('userName', 'El Usuario es obligatorio').not().isEmpty(),
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('lastName', 'El apellido es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        errorsResponse,
    ], 
    userController.addUser 
);

router.put( '/user/:id',
    [
        checkJWT,
        check('id', 'El ID no es correcto').isMongoId(),
        check('userName', 'El Usuario es obligatorio').not().isEmpty(),
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('lastName', 'El apellido es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        errorsResponse,
    ], 
    userController.updateUser 
);

router.delete( '/user/:id',
    checkJWT,
    userController.deleteUser
);

module.exports = router;