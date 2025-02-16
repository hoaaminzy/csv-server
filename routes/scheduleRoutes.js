const express = require("express");
const {
  createSchedule,
  getAllSchedule,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
} = require("../controllers/scheduleController");

const router = express.Router();

// Route to create a new class
router.post("/schedule", createSchedule);
router.get("/get-all-schedule", getAllSchedule);
router.get("/schedule/:id", getScheduleById);
router.put("/:id", updateSchedule);
router.delete("/schedule/:id", deleteSchedule);

module.exports = router;
