const express = require("express");
const {
  createCourse,
  getAllCourse,
  getCourseById,
  updateCourese,
  deleteCourse,
} = require("../controllers/courseController");

const router = express.Router();

// Route to create a new class
router.post("/course", createCourse);
router.get("/get-all-course", getAllCourse);
router.get("/course/:id", getCourseById);
router.put("/course/:id", updateCourese);
router.delete("/course/:id", deleteCourse);

module.exports = router;
