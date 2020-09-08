const express = require("express");
const { check } = require("express-validator");
const { errorsResponse } = require("../middlewares/errorsResponse");

const propertyController = require("../controller/propertyController");

const router = express.Router();

router.get("/properties", propertyController.getProperties);
router.post(
  "/property",
  [
    check("adressNickname", "Campo obligatorio").not().isEmpty(),
    check("adress", "Campo obligatorio").not().isEmpty(),
    errorsResponse,
  ],
  propertyController.createProperty
);

router.put("/property/:propertyId", [
  errorsResponse
], propertyController.updateProperty);

router.delete('/property/:propertyId', propertyController.deleteProperty);

module.exports = router;
