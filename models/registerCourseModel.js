const mongoose = require("mongoose");

const RegisterCourseSchema = new mongoose.Schema(
  {
    inforStudent: {
      type: Object,
    },
    course: {
      type: Object,
    },
    status: {
      type: Boolean,
      default: false,
    },
    paymentStatus: {
      type: Boolean,
      default: false,
    },
    datePayment: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RegisterCourse", RegisterCourseSchema);
