const Property = require("../model/property");
const { validationResult } = require("express-validator");
const { generateJWT } = require( "../helpers/jwt" );

exports.getProperties = async (req, res, next) => {
  try {
    const properties = await Property.find();
    res.status(200).json({
      ok: true,
      message: "Departamento Creado",
      properties,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Inesperado " + error,
      ok: false,
    });
  }
};

exports.createProperty = async (req, res, next) => {

  try {
    const property = new Property(req.body);
    await property.save();
    res.status(200).json({
      ok: true,
      property,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Inesperado " + error,
      ok: false,
    });
  }
};


exports.updateProperty = async (req, res, next) => {
    const propertyId = req.params.propertyId;
    
    const token = await generateJWT(propertyId);
    console.log(token);

    try {
        const updateProperty = await Property.findByIdAndUpdate(propertyId, req.body,{new: true});
        res.status(200).json({
            ok: true,
            updateProperty,
            token
        });
    } catch (error) {
        res.status(500).json({
          message: "Error Inesperado " + error,
          ok: false,
          
        });
      }
};

exports.deleteProperty = async (req, res, next) => {
  const propertyId = req.params.propertyId;
  
  try {
      const deleteProperty = await Property.findByIdAndDelete(propertyId);
      res.status(200).json({
        ok: true,
        deleteProperty
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Inesperado " + error,
      ok: false,
    });
  }
};
