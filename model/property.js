const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertySchema = new Schema({
  adressNickname: {
    type: String,
    required: true,
  },
  adress: {
    type: String,
    required: true,
  },
  //UserId: { type: Schema.Types.ObjectID, ref: "User", required: true },
});

module.exports = mongoose.model("Property", propertySchema);
