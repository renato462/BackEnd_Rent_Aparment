const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const paymentSchema = new Schema(
  {
    voucherType: {
      type: String,
      required: true,
    },

    voucherSerie: {
      type: String,
      required: true,
    },
    voucherNumber: {
      type: String,
      required: true,
    },

    moneyIncome: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    moneyIncomeTotal: {
      type: Number,
      required: true,
    },
    period: {
        type: String,
        required: true,
    },
    startPeriod: { 
        type:Date, 
        required: true
    },
    endPeriod: { 
        type:Date, 
        required: true
    },
    status: { 
        type:String, 
        required: true
    },
    rentId: {
      type: Schema.Types.ObjectId,
      ref: "rent",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);
