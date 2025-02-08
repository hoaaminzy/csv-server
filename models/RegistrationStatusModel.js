const mongoose = require("mongoose");

const RegistrationStatusSchema = new mongoose.Schema({
  openSemester: { type: String, required: true }, // Học kỳ đang mở
  updatedAt: { type: Date, default: Date.now }, // Thời gian cập nhật
});

module.exports = mongoose.model("RegistrationStatus", RegistrationStatusSchema);
