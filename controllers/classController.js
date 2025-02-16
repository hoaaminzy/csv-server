const Class = require("../models/classModel");
const XLSX = require("xlsx");
// Create a new class
const path = require("path");
const fs = require("fs");
exports.createClass = async (req, res) => {
  try {
    const { maLop } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Vui lòng tải lên một file!" });
    }

    const fileUrl = `/uploads/${req.file.filename}`;

    // Check if maLop already exists
    const existingClass = await Class.findOne({ maLop });
    if (existingClass) {
      return res.status(400).json({ message: "Mã lớp đã tồn tại!" });
    }

    // Create a new class
    const newClass = new Class({
      ...req.body,
      fileUrl,
    });

    const savedClass = await newClass.save();
    res.status(201).json(savedClass);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

// Get all classes
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.downloadFile = async (req, res) => {
  try {
    const formId = req.params.id;

    // Find form by ID
    const form = await Class.findById(formId);

    if (!form || !form.fileUrl) {
      return res.status(404).send("File not found");
    }

    // Build the correct file path relative to the 'uploads' folder
    const filePath = path.join(
      __dirname,
      "..",
      "uploads",
      path.basename(form.fileUrl)
    );

    // Log the file path for debugging
    console.log("File path to download:", filePath);

    if (fs.existsSync(filePath)) {
      // Send the file with the appropriate content-disposition header
      res.download(filePath, path.basename(form.fileUrl), (err) => {
        if (err) {
          console.error("Error downloading file:", err);
          res.status(500).send("Server error");
        }
      });
    } else {
      res.status(404).send("File not found");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Server error");
  }
};
exports.deleteClass = async (req, res) => {
  try {
    const dlClass = await Class.findByIdAndDelete(req.params.id);
    if (!dlClass) return res.status(404).json({ error: "Class not found" });
    res.json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
