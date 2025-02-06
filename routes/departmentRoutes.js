const express = require("express");
const {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departmentController");

const router = express.Router();

// Lấy danh sách khoa
router.get("/get-all-departments", getDepartments);

// Thêm khoa mới
router.post("/create-departments", createDepartment);
router.put("/update-department/:id", updateDepartment);

router.delete("/delete-department/:id", deleteDepartment);
module.exports = router;
