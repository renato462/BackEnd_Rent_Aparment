const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clientSchema = new Schema(
  {
    clientName: {
      type: String,
      required: true,
    },
    typeDocument: {
      type: String,
      required: true,
      default: "DNI",
    },
    numberDocument: {
      type: String,
      required: true,
    },
    adress: { type: String, maxlength: 70, require: true },

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
    // regionCode: { type: String, require: true },
    // regionName: { type: String, require: true },
    // provincieCode: { type: String, require: true },
    // ProvinceName: { type: String, require: true },
    // districtCode: { type: String, require: true },
    // districtName: { type: String, require: true },
    contact:{type: String, require:true},
    phone: { type: String, maxlength: 20 },
    email: { type: String, maxlength: 50 },
    status: { type: Number, default: 1 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Client", clientSchema);

// import mongoose, {Schema} from 'mongoose';
// const personaSchema = new Schema({
//     tipo_persona: { type:String,maxlength:20, required:true},
//     nombre: { type:String,maxlength:50, unique:true, required:true},
//     tipo_documento: { type:String,maxlength:20},
//     num_documento: { type:String,maxlength:20},

// 	createdAt: { type: Date, default: Date.now }
// });

// const Persona = mongoose.model('persona',personaSchema);
// export default Persona;
