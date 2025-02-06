const mongoose = require("mongoose");
const courseDetailSchema = new mongoose.Schema({
  name: String,
  code: String,
  credits: Number,
  lectureHours: Number,
  practiceHours: Number,
  mandatory: Boolean,
});

const semesterSchema = new mongoose.Schema({
  hk: String,
  courses: [courseDetailSchema],
});
const CourseSchema = new mongoose.Schema({
  nganh: { type: String, required: true },
  khoa: { type: String, required: true },
  semesters: [semesterSchema],
});
module.exports = mongoose.model("Course", CourseSchema);
