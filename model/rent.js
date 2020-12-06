const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);


const Schema = mongoose.Schema;

const rentSchema = new Schema(
  {
    contractNumber: {
      type:Number,
      
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    warranty: {
      type: Number,
    },
    contractMonths: {
      type: Number,
    },
    status: {
      type: String,
      required: true,
      default: "Contrato Vigente",
    },
    paymentId:[{
        type: Schema.Types.ObjectId,
        ref:'Payment',
    
    }],
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    aparmentId: {
      type: Schema.Types.ObjectId,
      ref: "Aparment",
      required: true,
    
    },
  },
  {
    timestamps: true,
  }
);

rentSchema.plugin(AutoIncrement,{inc_field: "contractNumber"})

module.exports = mongoose.model("Rent", rentSchema);
