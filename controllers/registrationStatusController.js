const RegistrationStatus = require("../models/RegistrationStatusModel");

// 📌 Lấy học kỳ đang mở
exports.getAllHK = async (req, res) => {
  try {
    const status = await RegistrationStatus.findOne();
    res.json(status);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// 📌 Cập nhật học kỳ mở
exports.updateHK = async (req, res) => {
  try {
    const { openSemester } = req.body;

    let status = await RegistrationStatus.findOne();
    if (status) {
      status.openSemester = openSemester;
      status.updatedAt = Date.now();
      await status.save();
    } else {
      status = new RegistrationStatus({ openSemester });
      await status.save();
    }

    res.json({ message: "Học kỳ mở đã cập nhật", status });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};
