const express = require("express");
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  loginStudent,
} = require("../controllers/studentController");
const { uploader } = require("../config/cloundinary");
const upload = require("../config/multerConfig");

const router = express.Router();

// Routes
router.get("/get-all-students", getAllStudents);
router.post("/login-student", loginStudent);

router.get("/student/:student_id", getStudentById);
router.post("/add-student", upload.single("image"), createStudent);
router.put("/update-student/:id", updateStudent);
router.delete("/delete-student/:id", deleteStudent);

module.exports = router;
