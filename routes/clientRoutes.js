const express = require("express");
const { check } = require("express-validator");
const { errorsResponse } = require("../middlewares/errorsResponse");
const { checkJWT } = require('../middlewares/jwtMiddleware');

const clientController = require("../controller/clientController");

const router = express.Router();

router.get("/clients", checkJWT, clientController.getClients);
router.post(
  "/client",
  [
    checkJWT,
    errorsResponse,
  ],
  clientController.createClient
);

router.put("/client/:clientId", [
  errorsResponse, checkJWT
], clientController.updateClient);

router.delete('/client/:clientId', checkJWT,clientController.deleteClient);

module.exports = router;
