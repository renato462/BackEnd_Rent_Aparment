const Client = require("../model/client");

const { ITEMS_PER_PAGE } = require("../config/index.js");

const msg = "Se envio el DATO";
exports.getClients = (req, res, next) => {
  const page = +req.query.page || 1;
  let clientTotal;
  Client.countDocuments()
    .then((count) => {
      clientTotal = count;
      return (
        Client.find()
          // .sort({ createdAt: new Date() })
          .skip((page - 1) * Number(ITEMS_PER_PAGE))
          .limit(Number(ITEMS_PER_PAGE))
      );
    })
    .then((clients) => {
      res.status(200).json({
        ok: true,
        msg,
        clients,
        clientTotal,
        page,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error Inesperado " + error,
        ok: false,
      });
    });
};

exports.createClient = async (req, res, next) => {
  try {
    const client = await Client.create({ ...req.body });
    res.status(200).json({
      ok: true,
      msg,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Inesperado" + error,
      ok: false,
    });
  }
};

exports.updateClient = async (req, res, next) => {
  const clientId = req.params.clientId;
  try {
    const updateClient = await Client.findByIdAndUpdate(clientId, req.body, {
      new: true,
    });

    res.status(200).json({
      ok: true,
      updateClient,
      msg,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Inesperado " + error,
      ok: false,
    });
  }
};

exports.getClient = async (req, res, next) => {
  const clientId = req.params.clientId;

  try {
    const client = await Client.findById(clientId);
    res.status(200).json({
      ok: tue,
      msg,
      client,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error Inesperado " + error,
    });
  }
};

exports.deleteClient = async (req, res, next) => {
  const clientId = req.params.clientId;
  console.log(clientId);
  try {
    const deleteClient = await Client.findByIdAndDelete(clientId);
    res.status(200).json({
      msg,
      ok: true,
      deleteClient,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error Inesperado" + error,
    });
  }
};
