const Department = require("../models/departmentModel");

// Lấy danh sách tất cả các khoa và ngành học
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thêm một khoa mới
exports.createDepartment = async (req, res) => {
  try {
    const { faculty, majors } = req.body;

    const newDepartment = new Department({
      faculty,
      majors,
    });

    await newDepartment.save();
    res.status(200).json({ message: "Khoa đã được thêm thành công!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Đã xảy ra lỗi!" });
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    const { faculty, majors } = req.body;

    const updatedDepartment = await Department.findByIdAndUpdate(
      req.params.id,
      { faculty, majors },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Cập nhật khoa thành công!", updatedDepartment });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi!" });
  }
};
exports.deleteDepartment = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDepartment = await Department.findByIdAndDelete(id);

    if (!deletedDepartment) {
      return res.status(404).json({ error: "Không tìm thấy khoa." });
    }

    res.status(200).json({ message: "Xóa khoa thành công!" });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi xóa khoa." });
  }
};
