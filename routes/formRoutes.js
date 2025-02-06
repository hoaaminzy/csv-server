const express = require("express");
const uploadForm = require("../config/uploadForm");
const {
  createForm,
  downloadForm,
  getAllForms,
  deleteForm,
} = require("../controllers/formController");

const router = express.Router();

router.post("/forms", uploadForm.single("file"), createForm);
router.get("/forms/:id/download", downloadForm);
router.get("/forms", getAllForms);
router.delete("/deleteForms/:id", deleteForm);

module.exports = router;
