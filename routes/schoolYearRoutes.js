const express = require("express");
const {
  getAllSchoolYears,
  createSchoolYear,
  updateSchoolYear,
  deleteSchoolYear,
} = require("../controllers/schoolYearController");

const router = express.Router();

// Routes for CRUD operations
router.get("/get-all-school", getAllSchoolYears); // Get all school years
router.post("/create", createSchoolYear); // Create a new school year
router.put("/update/:id", updateSchoolYear); // Update a school year by ID
router.delete("/delete/:id", deleteSchoolYear); // Delete a school year by ID

module.exports = router;
