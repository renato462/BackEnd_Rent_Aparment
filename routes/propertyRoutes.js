const express = require("express");
const { check } = require("express-validator");
const { errorsResponse } = require("../middlewares/errorsResponse");
const { checkJWT } = require('../middlewares/jwtMiddleware');

const propertyController = require("../controller/propertyController");

const router = express.Router();

router.get("/properties", checkJWT, propertyController.getProperties);
router.post(
  "/property",
  [
    checkJWT,
    check("adressNickname", "Campo obligatorio").not().isEmpty(),
    check("adress", "Campo obligatorio").not().isEmpty(),
    errorsResponse,
  ],
  propertyController.createProperty
);

router.put("/property/:propertyId", [
  errorsResponse, checkJWT
], propertyController.updateProperty);

router.delete('/property/:propertyId', checkJWT,propertyController.deleteProperty);

module.exports = router;
