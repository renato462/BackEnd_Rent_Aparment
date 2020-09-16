/*
    Ruta: /api/user
*/
const express = require("express");

const fileUpload = require('express-fileupload');
const { check } = require('express-validator');
const { errorsResponse } = require('../middlewares/errorsResponse');

const uploadController = require('../controller/uploadController');
const { checkJWT } = require('../middlewares/jwtMiddleware');


const router = express.Router();

// default options
router.use(fileUpload());


router.put( '/',checkJWT, uploadController.uploadFiles);



module.exports = router;