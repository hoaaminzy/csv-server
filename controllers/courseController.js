const Course = require("../models/courseModel");
exports.createCourse = async (req, res) => {
  const { nganh, khoa, semesters } = req.body;
  try {
    const course = new Course({ nganh, khoa, semesters });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// Lấy danh sách tất cả khóa học
exports.getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy thông tin một khóa học theo ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật khóa học
exports.updateCourese = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Xóa khóa học
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
