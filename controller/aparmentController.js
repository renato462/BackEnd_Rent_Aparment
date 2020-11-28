const Aparment = require("../model/aparment");
const Property = require("../model/property");
const Rent = require("../model/rent");

const { ITEMS_PER_PAGE } = require("../config/index.js");
const aparment = require("../model/aparment");

// exports.getApaments = (req, res, next) => {
//   const page = +req.query.page || 1;
//   let aparmentTotal;
//   Aparment.countDocuments()
//     .then((count) => {
//       aparmentTotal = count;
//       return Aparment
//         .find()
//         .sort({ code: 1 })
//         .populate("propertyId")
//         .skip((page - 1) * Number(ITEMS_PER_PAGE))
//         .limit(Number(ITEMS_PER_PAGE));
//     })
//     .then((aparments) => {

//       res.status(200).json({
//         ok: true,
//         message: "Se envio el apartamento",
//         aparments,
//         aparmentTotal,
//         page
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: "Error Inesperado " + error,
//         ok: false,
//       });
//     });
// };

exports.getAparmentFilter = (req, res, next) => {
  let rents;
  let aparmentsArray = [];
  Rent.find()
    .then((renta) => {
      rents = renta;
      return Aparment.find();
    })
    .then((aparaments) => {
      if (rents.length === 0) {
        aparmentsArray = aparaments;
         res.status(200).json({
          ok: true,
          message: "Datos enviados",
          aparmentsArray,
        });
      } else {   
        const aparmentsArray = aparaments.filter(({ _id: _id }) => !rents.some(({ aparmentId: aparmentId }) => String(aparmentId) === String(_id)));
        res.status(200).json({
          ok: true,
          message: "Datos enviados",
          aparmentsArray,
        });
    
      }
    });
};

exports.getApaments = (req, res, next) => {
  Aparment.find()
    .populate("propertyId")
    .then((aparments) => {
      res.status(200).json({
        ok: true,
        message: "Datos enviados",
        aparments,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error Inesperado " + error,
        ok: false,
      });
    });
};

exports.createAparment = async (req, res, next) => {
  try {
    const aparment = Aparment.create({ ...req.body });
    res.status(200).json({
      ok: true,
      message: "Se creo el apartamento",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Inesperado" + error,
      ok: false,
    });
  }
};

exports.updateAparment = async (req, res, next) => {
  const aparmentId = req.params.aparmentId;
  try {
    const updateAparment = await Aparment.findByIdAndUpdate(
      aparmentId,
      req.body,
      { new: true }
    );

    res.status(200).json({
      ok: true,
      updateAparment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Inesperado " + error,
      ok: false,
    });
  }
};

exports.getAparment = async (req, res, next) => {
  const aparmentId = req.params.aparmentId;

  try {
    const aparment = await Aparment.findById(aparmentId);
    res.status(200).json({
      ok: tue,
      message: "Apartamente Enviado",
      aparment,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error Inesperado " + error,
    });
  }
};

exports.deleteAparment = async (req, res, next) => {
  const aparmentId = req.params.aparmentId;
  console.log(aparmentId);
  try {
    const deleteAparment = await Aparment.findByIdAndDelete(aparmentId);
    res.status(200).json({
      ok: true,
      deleteAparment,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error Inesperado" + error,
    });
  }
};
