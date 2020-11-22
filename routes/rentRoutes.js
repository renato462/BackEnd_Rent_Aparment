const express = require("express");
const { check } = require("express-validator");
const { errorsResponse } = require("../middlewares/errorsResponse");
const { checkJWT } = require('../middlewares/jwtMiddleware');

const rentController = require("../controller/rentController");

const router = express.Router();

router.get("/rents", checkJWT, rentController.getRents);
router.post("/rent",
  [
    checkJWT,
    check("startDate", "Campo obligatorio").not().isEmpty(),
    errorsResponse,
  ], rentController.createRent
);

router.put("/rent/:rentId", [
  errorsResponse, checkJWT
], rentController.updateRent);

router.delete('/rent/:rentId', checkJWT,rentController.deleteRent);

module.exports = router;
