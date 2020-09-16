/*
    Path: '/api/login'
*/
const { Router } = require('express');
const { login, googleSignIn, renewToken} = require('../controller/auth');
const { check } = require('express-validator');
const { errorsResponse } = require('../middlewares/errorsResponse');
const {checkJWT} = require('../middlewares/jwtMiddleware')

const router = Router();


router.post( '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        errorsResponse
    ],
    login
);

router.post( '/google',
    [
        check('token', 'El token de Google es obligatorio').not().isEmpty(),
        errorsResponse
    ],
    googleSignIn
);

router.get( '/renew',
    checkJWT,
    renewToken
)



module.exports = router;

