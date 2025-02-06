const express = require("express");
const route = express.Router();

const { authenticateToken } = require("../middlewares/authMiddleware");
const {
  signUpUser,
  loginUser,
  getAllUsers,
  deleteUser,
  updateUser,
  loginAdmin,
  getMe,
} = require("../controllers/userController");

route.post("/signup", signUpUser);
route.post("/login", loginUser);
route.get("/get-all-users", getAllUsers);
route.delete("/delete-user/:id", deleteUser);
route.put("/update-user/:id", updateUser);
route.post("/login-admin", loginAdmin);
route.get("/me", authenticateToken, getMe);

module.exports = route;
