const Point = require("../models/pointModel");

// Hàm tạo mới một lớp học
const createPoint = async (req, res) => {
  console.log(req.body);
  try {
    const { mLP, sTNCh, lPHCPhN, tNGiOViN, nMHC, mNHC, hCK, members } =
      req.body;

    // Tạo một lớp học mới
    const newPoint = new Point({
      mLP,
      lPHCPhN,
      sTNCh,
      tNGiOViN,
      nMHC,
      mNHC,
      hCK,
      members,
    });

    await newPoint.save();
    res
      .status(201)
      .json({ message: "Lớp học đã được tạo thành công", Point: newPoint });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Lỗi khi tạo lớp học", error: error.message });
  }
};

// Hàm lấy tất cả lớp học
const getAllPointes = async (req, res) => {
  try {
    const Pointes = await Point.find();
    res.status(200).json(Pointes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy danh sách lớp học", error: error.message });
  }
};

const getPointById = async (req, res) => {
  const { mLP } = req.params;
  try {
    // Tìm một bản ghi duy nhất theo maLop
    const point = await Point.findOne(
      { mLP } // Tìm theo mã lớp
    );

    // Nếu không tìm thấy bản ghi nào
    if (!point) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy dữ liệu cho lớp này." });
    }

    // Trả về dữ liệu khi tìm thấy
    res.status(200).json(point);
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    res.status(500).json({ message: "Đã xảy ra lỗi." });
  }
};

// Hàm cập nhật điểm cho tất cả thành viên trong lớp
const updateAllMembersGrades = async (req, res) => {
  const { mLP, members } = req.body; // Lấy mã lớp và danh sách thành viên từ request body
  console.log(mLP);

  try {
    // Tìm lớp học theo mã lớp (mLP)
    const pointRecord = await Point.findOne({ mLP });

    // Kiểm tra xem lớp học có tồn tại không
    if (!pointRecord) {
      return res.status(404).json({ message: "Lớp học không tồn tại!" });
    }

    // Cập nhật điểm cho tất cả thành viên trong lớp
    const updatedMembers = pointRecord.members.map((member) => {
      const updatedMember = members.find(
        (updated) => updated.mssv === member.mssv
      );

      // Nếu có thông tin cập nhật cho thành viên này, cập nhật điểm
      if (updatedMember) {
        member.kttx = updatedMember.updatedFields.kttx || member.kttx;
        member.nttd = updatedMember.updatedFields.nttd || member.nttd;
        member.giuaky = updatedMember.updatedFields.giuaky || member.giuaky;
        member.thucHanh =
          updatedMember.updatedFields.thucHanh || member.thucHanh;
        member.cuoiky = updatedMember.updatedFields.cuoiky || member.cuoiky;
        member.thuchanh =
          updatedMember.updatedFields.thuchanh || member.thuchanh;

        // Tính lại điểm tổng kết
        const { kttx, nttd, giuaky, thuchanh, cuoiky } = member;
        member.tongket =
          [kttx, nttd, giuaky, thuchanh, cuoiky]
            .filter((v) => v !== "0")
            .reduce((sum, v) => sum + parseFloat(v), 0) / 5;

        if (Number(member.tongket) < 4) {
          member.status = "Rớt";
        }
      }

      return member;
    });

    // Cập nhật lại tất cả các thành viên trong lớp
    pointRecord.members = updatedMembers;

    // Lưu lại điểm đã cập nhật
    await pointRecord.save();

    return res
      .status(200)
      .json({ message: "Cập nhật điểm thành công cho tất cả thành viên!" });
  } catch (error) {
    console.error("Lỗi khi cập nhật điểm:", error);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi cập nhật điểm!" });
  }
};

// Hàm xóa lớp học
const deletePoint = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPoint = await Point.findByIdAndDelete(id);

    if (!deletedPoint) {
      return res.status(404).json({ message: "Không tìm thấy lớp học để xóa" });
    }

    res.status(200).json({ message: "Lớp học đã bị xóa" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi xóa lớp học", error: error.message });
  }
};

module.exports = {
  getPointById,
  getAllPointes,
  createPoint,
  deletePoint,
  updateAllMembersGrades,
};
