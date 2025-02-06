// models/Department.js
const mongoose = require("mongoose");

// models/Schedule.js
const ScheduleSchema = new mongoose.Schema(
  {
    course: {
      type: String,
      required: true,
    },
    date: {
      type: String,
    },
    morning: {
      type: Boolean,
      default: false,
    },
    afternoon: {
      type: Boolean,
      default: false,
    },
    evening: {
      type: Boolean,
      default: false,
    },
    time: {
      type: String,
      required: true, // Assuming this field is required
    },
    room: {
      type: String,
      required: true, // Assuming this field is required
    },
    faculty: {
      type: String,
      required: true,
    },
    major: {
      type: String,
      required: true,
    },
    courseHK: {
      type: String,
      required: true,
    },
    loaiLichHoc: {
      type: String,
      required: true,
    },
    slot: {
      type: String,
      required: true,
    },
    time: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Schedule", ScheduleSchema);
