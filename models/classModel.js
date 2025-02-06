const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  maLop: {
    type: String,
    required: true,
    unique: true,
  },
  namhoc: {
    type: String,
    required: true,
  },
  khoa: {
    type: String,
    required: true,
  },
  nganh: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Class", ClassSchema);
