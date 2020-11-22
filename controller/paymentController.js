const Payment = require("../model/payment");

const Item = Payment;

exports.getItems = async (req, res, next) => {
  try {
    const items = await Item.find();
    res.status(200).json({
      ok: true,
      message: "Se enviaron todos los items",
      items,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Inesperado " + error,
      ok: false,
    });
  }
};

exports.createItem = async (req, res, next) => {

  try {
    const item = new Item(req.body);
    await item.save();
    res.status(200).json({
      ok: true,
      item,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Inesperado " + error,
      ok: false,
    });
  }
};


exports.updateItem = async (req, res, next) => {
    const itemId = req.params.itemId;

    try {
        const updateItem = await Item.findByIdAndUpdate(itemId, req.body,{new: true});
        res.status(200).json({
            ok: true,
            updateItem,
        });
    } catch (error) {
        res.status(500).json({
          message: "Error Inesperado " + error,
          ok: false,
          
        });
      }
};

exports.deleteItem = async (req, res, next) => {
  const itemId = req.params.itemId;
  
  try {
      const deleteItem = await Item.findByIdAndDelete(rentId);
      res.status(200).json({
        ok: true,
        deleteItem
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Inesperado " + error,
      ok: false,
    });
  }
};
