const mongoose = require("mongoose");
const Student = require("./studentModel");

const PaymentMomoSchema = new mongoose.Schema(
  {
    semester: {
      type: String,
    },
    student: {
      type: Object,
    },
    orderId: {
      type: String,
    },
    courses: {
      type: Array,
      default: [],
    },
    pay: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PaymentMomo", PaymentMomoSchema);
