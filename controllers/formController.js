const Form = require("../models/formModel");
const path = require("path");
const fs = require("fs");

// Create a form and save it to the database
exports.createForm = async (req, res) => {
  const { name } = req.body;
  const fileUrl = `/uploads/${req.file.filename}`;

  const form = new Form({ name, fileUrl });
  await form.save();
  res.json(form);
};

// Download a specific form
exports.downloadForm = async (req, res) => {
  try {
    const formId = req.params.id;

    // Find form by ID
    const form = await Form.findById(formId);

    if (!form || !form.fileUrl) {
      return res.status(404).send("Form or file not found");
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

// Get all forms
exports.getAllForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching forms", error });
  }
};

exports.deleteForm = async (req, res) => {
  try {
    const course = await Form.findByIdAndDelete(req.params.id);
    if (!course)
      return res.status(404).json({ error: "Không tìm thấy biểu mẫu" });
    res.json({ message: "Xóa biểu mẫu thành công" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
