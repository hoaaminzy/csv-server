const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { type } = require("os");
var userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Địa chỉ email không hợp lệ"],
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      match: [/^\d{10,11}$/, "Số điện thoại không hợp lệ"],
    },
    address: {
      type: String,
      required: false,
      trim: true,
    },
    khoa: {
      type: String,
      required: true,
      trim: true,
    },
    nganh: {
      type: String,
      required: true,
      trim: true,
    },
    learn: { type: Array },
    password: {
      type: String,
      required: true,
      minlength: 6, // Minimum password length
    },
    role: {
      type: String,
      enum: ["teacher", "admin"],
      default: "teacher",
    },

    refreshToken: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
module.exports = mongoose.model("User", userSchema);
