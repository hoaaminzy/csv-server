const mongoose = require("mongoose");

// Schema cho điểm của từng thành viên
const gradeSchema = new mongoose.Schema({
  tNThNhViN: { type: String, required: true },
  mssv: { type: String, required: true }, // Tên thành viên
  // Tên thành viên
  kttx: { type: String, default: "0" }, // Điểm KTTX
  nttd: { type: String, default: "0" }, // Điểm NTTD
  giuaky: { type: String, default: "0" }, // Điểm Giữa kỳ
  thuchanh: { type: String, default: "0" }, // Điểm Thực hành
  cuoiky: { type: String, default: "0" }, // Điểm Cuối kỳ
  tongket: { type: String, default: "0" }, // Điểm Tổng kết
  status: { type: String, default: "" },
});

// Schema cho lớp học
const pointSchema = new mongoose.Schema(
  {
    lPHCPhN: { type: String },
    mLP: { type: String },
    sTNCh: { type: String },
    tNGiOViN: { type: String },
    nMHC: { type: String },
    mNHC: { type: String },
    hCK: { type: String },
    members: [gradeSchema],
  },
  { timestamps: true }
);

// Tạo model từ schema
const Point = mongoose.model("Point", pointSchema);

module.exports = Point;
