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
  region: {
    code: { type: String, require: true },
    name: { type: String, require: true },
  },
  provincie: {
    code: { type: String, require: true },
    name: { type: String, require: true },
  },
  district: {
    code: { type: String, require: true },
    name: { type: String, require: true },
  },
  //UserId: { type: Schema.Types.ObjectID, ref: "User", required: true },
});

module.exports = mongoose.model("Property", propertySchema);
