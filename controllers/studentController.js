const Student = require("../models/studentModel");
const bcrypt = require("bcryptjs");
// Lấy tất cả sinh viên
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
};

// Lấy thông tin sinh viên theo ID
const getStudentById = async (req, res) => {
  const { student_id } = req.params;
  try {
    const student = await Student.findOne({
      student_id,
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching student", error });
  }
};

// Tạo mới một sinh viên
const createStudent = async (req, res) => {
  const imagePath = req.file ? req.file.path : null;
  const personalInfo = JSON.parse(req.body.personal_info);
  const familyInfo = JSON.parse(req.body.family_info);
  const educationInfo = JSON.parse(req.body.education_info);

  const { password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = new Student({
      ...req.body,
      personal_info: personalInfo,
      family_info: familyInfo,
      education_info: educationInfo,
      password: hashedPassword,
      image: imagePath,
    });
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating student", error });
  }
};

// Cập nhật thông tin sinh viên
const updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Trả về document đã cập nhật
        runValidators: true, // Chạy các validators trong schema
      }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: "Error updating student", error });
  }
};

// Xóa sinh viên
const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error });
  }
};

const loginStudent = async (req, res) => {
  const { student_id, password } = req.body;

  try {
    const student = await Student.findOne({ student_id });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // So sánh mật khẩu đã hash
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", data: student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  loginStudent,
};
