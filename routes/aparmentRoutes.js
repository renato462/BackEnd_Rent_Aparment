const express = require("express");
const { check } = require("express-validator");
const { errorsResponse } = require("../middlewares/errorsResponse");
const { checkJWT } = require('../middlewares/jwtMiddleware');

const aparmentController = require("../controller/aparmentController");
const dashboardController = require("../controller/dashboardController");

const router = express.Router();

router.get("/aparments", aparmentController.getApaments);
router.get("/aparmentsFilter", aparmentController.getAparmentFilter);

router.get("/dashboard", dashboardController.freeAparment);

router.get("/aparment/:aparmentId", aparmentController.getAparment);

router.post("/aparment", [errorsResponse], aparmentController.createAparment);

router.put("/aparment/:aparmentId", [errorsResponse], aparmentController.updateAparment);

router.delete('/aparment/:aparmentId', [errorsResponse], aparmentController.deleteAparment);

module.exports = router;
