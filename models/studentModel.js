const mongoose = require("mongoose");

const FamilyMemberSchema = new mongoose.Schema({
  relation: { type: String, trim: true }, // Quan hệ (Bố, Mẹ, Anh/Em)
  name: { type: String, trim: true }, // Tên
  birth_year: { type: String }, // Năm sinh
  ethnicity: { type: String, trim: true, default: "" }, // Dân tộc
  religion: { type: String, trim: true, default: "" }, // Tôn giáo
  nationality: { type: String, trim: true, default: "" }, // Quốc tịch
  job: { type: String, trim: true, default: "" }, // Nghề nghiệp
  organization: { type: String, trim: true, default: "" }, // Cơ quan công tác
  position: { type: String, trim: true, default: "" }, // Chức vụ
  phone: { type: String, trim: true, default: "" }, // Số điện thoại
  address: { type: String, trim: true, default: "" }, // Chỗ ở hiện nay
});

const StudentSchema = new mongoose.Schema(
  {
    student_id: { type: String, default: "", unique: true, trim: true }, // MSSV
    full_name: { type: String, default: "", trim: true }, // Họ và Tên
    image: { type: String },
    gender: { type: String, default: "", enum: ["Nam", "Nữ"], trim: true }, // Giới tính
    password: { type: String, require: true },
    education_info: {
      status: { type: String, default: "", trim: true }, // Trạng thái
      student_code: { type: String, default: "", trim: true }, // Mã hồ sơ
      admission_date: { type: String, default: "" }, // Ngày vào trường
      class: { type: String, default: "", trim: true }, // Lớp học
      campus: { type: String, default: "Cơ sở chính", trim: true }, // Cơ sở
      degree: { type: String, default: "Đại học", trim: true }, // Bậc đào tạo
      education_type: { type: String, default: "Chính quy", trim: true }, // Loại hình đào tạo
      faculty: { type: String, default: "", trim: true }, // Khoa
      major: { type: String, default: "", trim: true }, // Chuyên ngành
      course: { type: String, default: "", trim: true }, // Khóa học
    },

    personal_info: {
      birth_date: { type: String, default: "" }, // Ngày sinh
      ethnicity: { type: String, default: "", trim: true }, // Dân tộc
      religion: { type: String, trim: true, default: "" }, // Tôn giáo (tùy chọn)
      nationality: { type: String, default: "", trim: true }, // Quốc tịch
      region: { type: String, default: "" }, // Khu vực
      id_card: {
        number: { type: String, default: "", trim: true }, // Số CCCD
        issue_date: { type: String, default: "" }, // Ngày cấp
        issue_place: { type: String, default: "", trim: true }, // Nơi cấp
      },
      policyArea: { type: String, default: "", trim: true }, // Khu vực ưu tiên
      dateOfJoiningTheParty: { type: String, default: "" }, // Ngày vào Đảng
      phone: { type: String, default: "", trim: true }, // Điện thoại
      email: { type: String, default: "", trim: true }, // Email
      current_address: { type: String, default: "", trim: true }, // Địa chỉ hiện tại
      permanent_address: { type: String, default: "", trim: true }, // Hộ khẩu thường trú
    },

    family_info: [FamilyMemberSchema], // Danh sách thành viên gia đình

    // Ngày cập nhật
  },
  {
    timestamps: true,
  }
);

// Compile model
const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
