const Aparment = require("../model/aparment");
const Rent = require("../model/rent");
const Property = require("../model/property");
const { count } = require("../model/aparment");
const rent = require("../model/rent");

exports.freeAparment = async (req, res, next) => {
  try {
    const properties = await Property.find();
    const aparments = await Aparment.find();
    const rents = await Rent.find().populate("aparmentId", "code propertyId");

    const propertiesArray = properties.map((property) => {
      let count = 0;
      aparments.forEach((aparment) => {
        if (String(aparment.propertyId) === String(property.id)) {
          count++;
        }
      });
      return { total: count, ...property._doc };
    });

    const aparmentsArray2 = propertiesArray.map((property) => {
      let countContratoVigente = 0;
      let deuda = 0;
      let countContratoCerrado = 0;
      rents.forEach((rent) => {
        if (String(rent.aparmentId.propertyId) === String(property._id)) {
          switch (rent.status) {
            case "Contrato Vigente":
              countContratoVigente++;
              break;
            case "Deuda":
              deuda++;
              break;
            case "Contrato Cerrado":
              countContratoCerrado++;
              break;
            default:
              console.log("No Existe");
          }
        }
      });
      property.contratoVigente = countContratoVigente;
      property.deuda = deuda;
      property.contratoCerrado = countContratoCerrado;
      return property;
    });

    res.status(200).json({
      Ok: true,
      aparmentsArray2,
    });

    // const propertiesArray  = properties.map(async (property) => {

    //   counter = await Aparment.countDocuments({
    //     propertyId: { $eq: `${property.id}` },
    //   });
    //   property.total= counter;
    //   return property;
    // });

    // const properties2 = await Promise.all(propertiesArray);
    // console.log(properties2);

    // const countRentsVigente = await Rent.countDocuments({
    //     status: { $eq: "Contrato Vigente" },
    //     propertyId: { $eq: `${property.id}` },
    //   });
    //   const countRentsDeuda = await Rent.countDocuments({
    //     status: { $eq: "Deuda" },
    //   });
  } catch (error) {
    res.status(500).json({
      message: "Error Inesperado " + error,
      ok: false,
    });
  }
};
