const express = require("express");
const { check } = require("express-validator");
const { errorsResponse } = require("../middlewares/errorsResponse");
const { checkJWT } = require('../middlewares/jwtMiddleware');

const itemController = require("../controller/paymentController");

const router = express.Router();

router.get("/payments", checkJWT, itemController.getItems);
router.post("/payment",
  [
    checkJWT,
    errorsResponse,
  ], itemController.createItem
);

router.put("/payment/:itemId", [
  errorsResponse, checkJWT
], itemController.updateItem);

router.delete('/rent/:rentId', checkJWT,itemController.deleteItem);

module.exports = router;
