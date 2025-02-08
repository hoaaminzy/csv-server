const express = require("express");
const {
  getAllHK,
  updateHK,
} = require("../controllers/registrationStatusController");

const router = express.Router();

// 📌 Lấy học kỳ đang mở
router.get("/get-all", getAllHK);

// 📌 Cập nhật học kỳ mở
router.post("/open-hk", updateHK);

module.exports = router;
