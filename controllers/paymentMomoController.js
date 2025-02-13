const PaymentMomo = require("../models/paymentMomo");
// Create a new class

// Get all classes
exports.getAllPayment = async (req, res) => {
  try {
    const payments = await PaymentMomo.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getPaymentById = async (req, res) => {
  console.log(req.params.studentId);
  try {
    const course = await PaymentMomo.find({
      "student.student_id": req.params.studentId,
    });
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
