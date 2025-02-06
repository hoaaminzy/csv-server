const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Save file with original name
    cb(null, file.originalname);
  },
});

const uploadForm = multer({ storage });

module.exports = uploadForm;
