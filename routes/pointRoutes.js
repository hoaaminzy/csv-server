const express = require("express");
const {
  createPoint,
  getAllPointes,
  updateMemberGrades,
  deletePoint,
  getPointById,
  updateAllMembersGrades,
} = require("../controllers/pointController");
const router = express.Router();

// Định nghĩa các route cho lớp học
router.post("/point/create", createPoint);
router.get("/point/all", getAllPointes);
router.get("/point/:mLP", getPointById);
router.put("/point/updateAll", updateAllMembersGrades);
router.delete("/point/:id", deletePoint);

module.exports = router;
