const express = require("express");
const {
  createClass,
  getAllClasses,
  downloadFile,
  deleteClass,
} = require("../controllers/classController");
const uploadForm = require("../config/uploadForm");

const router = express.Router();

// Route to create a new class
router.post("/create", uploadForm.single("file"), createClass);

// Route to get all classes
router.get("/get-all-class", getAllClasses);
router.get("/class/:id/download", downloadFile);
router.delete("/delete-class/:id", deleteClass);

module.exports = router;
