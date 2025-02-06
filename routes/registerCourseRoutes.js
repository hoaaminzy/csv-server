const express = require("express");

const {
  createRegisterCourse,
  getAllRegisterCourse,
  deleteRegisterCourse,
  updateRegisterCourese,
} = require("../controllers/registerCourseController");

const router = express.Router();

// Route to create a new class
router.post("/create", createRegisterCourse);

// Route to get all classes
router.get("/get-all-registerCourse", getAllRegisterCourse);
router.delete("/registerCourse/:id", deleteRegisterCourse);
router.put("/registerCourse/:id", updateRegisterCourese);
module.exports = router;
