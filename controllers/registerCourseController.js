const RegisterCourse = require("../models/registerCourseModel");
exports.createRegisterCourse = async (req, res) => {
  const { inforStudent, course, status } = req.body;
  try {
    const checkExist = await RegisterCourse.findOne({ inforStudent, course });

    if (checkExist && checkExist.course.course === course.course) {
      return res.status(400).json({ error: "Course already exists" });
    }

    const rgC = new RegisterCourse({ inforStudent, course, status });
    await rgC.save();
    res.status(201).json(rgC);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// Lấy danh sách tất cả khóa học
exports.getAllRegisterCourse = async (req, res) => {
  try {
    const courses = await RegisterCourse.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy thông tin một khóa học theo ID
exports.getRegisterCourseById = async (req, res) => {
  try {
    const course = await RegisterCourse.findById(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật khóa học
exports.updateRegisterCourese = async (req, res) => {
  try {
    const course = await RegisterCourse.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Xóa khóa học
exports.deleteRegisterCourse = async (req, res) => {
  try {
    const course = await RegisterCourse.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
