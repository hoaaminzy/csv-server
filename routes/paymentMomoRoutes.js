const express = require("express");
const {
  getAllPayment,
  getPaymentById,
} = require("../controllers/paymentMomoController");

const router = express.Router();

// Route to create a new class

// Route to get all classes
router.get("/get-all-payment", getAllPayment);
router.get("/payment/:studentId", getPaymentById);

module.exports = router;
