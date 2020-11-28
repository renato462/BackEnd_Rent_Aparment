const Rent = require("../model/rent");
const { validationResult } = require("express-validator");
const { generateJWT } = require( "../helpers/jwt" );

exports.getRents = async (req, res, next) => {
  try {
    const rents = await Rent.find()
    .populate("clientId")
    .populate(({
      path : 'aparmentId',
      populate : {
        path : 'propertyId'
      }
    })
  );

    res.status(200).json({
      ok: true,
      message: "Se enviaron todos los items",
      rents,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Inesperado " + error,
      ok: false,
    });
  }
};

exports.createRent = async (req, res, next) => {

  try {
    const rent = new Rent(req.body);
    await rent.save();
    res.status(200).json({
      ok: true,
      rent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Inesperado " + error,
      ok: false,
    });
  }
};


exports.updateRent = async (req, res, next) => {
    const rentId = req.params.rentId;
    
    // const token = await generateJWT(rentId);
    // console.log(token);

    try {
        const updateRent = await Rent.findByIdAndUpdate(rentId, req.body,{new: true});
        res.status(200).json({
            ok: true,
            updateRent,
        });
    } catch (error) {
        res.status(500).json({
          message: "Error Inesperado " + error,
          ok: false,
          
        });
      }
};
exports.getRent = async (req, res, next) => {
  const rentId = req.params.rentId;

  try {
    const rent = await Rent.findById(rentId)
    .populate("clientId")
    .populate(({
      path : 'aparmentId',
      populate : {
        path : 'propertyId'
      }
    })
    );

    
    res.status(200).json({
      ok: true,
      rent
    });

  }
  catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error Inesperado" + error
    });
  }
};

exports.deleteRent = async (req, res, next) => {
  const rentId = req.params.rentId;
  
  try {
      const deleteRent = await Rent.findByIdAndDelete(rentId);
      res.status(200).json({
        ok: true,
        deleteRent
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Inesperado " + error,
      ok: false,
    });
  }
};
