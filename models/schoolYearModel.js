const mongoose = require("mongoose");

const schoolYearSchema = new mongoose.Schema(
  {
    year: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SchoolYear", schoolYearSchema);
