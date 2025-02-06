const Schedule = require("../models/scheduleModel");
exports.createSchedule = async (req, res) => {
  try {
    const schedule = new Schedule(req.body);
    await schedule.save();
    res.status(201).json(schedule);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};
exports.getAllSchedule = async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy thông tin một khóa học theo ID
exports.getScheduleById = async (req, res) => {
  try {
    const scheduleId = await Schedule.findById(req.params.id);
    if (!scheduleId)
      return res.status(404).json({ error: "Schedule not found" });
    res.json(scheduleId);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật khóa học
exports.updateSchedule = async (req, res) => {
  try {
    const newSchedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!newSchedule)
      return res.status(404).json({ error: "Schedule not found" });
    res.json(newSchedule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Xóa khóa học
exports.deleteSchedule = async (req, res) => {
  try {
    const deleteSchedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!deleteSchedule)
      return res.status(404).json({ error: "Schedule not found" });
    res.json({ message: "Schedule deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
