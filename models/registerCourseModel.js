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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RegisterCourse", RegisterCourseSchema);
