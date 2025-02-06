const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  faculty: {
    type: String,
    required: true,
  },
  majors: [
    {
      name: String,
      courses: [String], // Array of strings for course names
    },
  ],
});

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
