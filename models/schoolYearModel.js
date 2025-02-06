const mongoose = require("mongoose");

const schoolYearSchema = new mongoose.Schema(
  {
    year: { type: String, required: true, unique: true },
    semesters: { type: [String], required: true }, // Array of semesters
  },
  { timestamps: true }
);
// Unique constraint
schoolYearSchema.index({ year: 1, semester: 1 }, { unique: true });

module.exports = mongoose.model("SchoolYear", schoolYearSchema);
