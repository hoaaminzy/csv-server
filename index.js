const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const app = express();
const path = require("path");
const studentRoutes = require("./routes/studentRoutes");
const schoolYearRoutes = require("./routes/schoolYearRoutes");
const pointRoutes = require("./routes/pointRoutes");
const authRoutes = require("./routes/authRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const classRoutes = require("./routes/classRoutes");
const coursesRoutes = require("./routes/courseRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const registerCourseRoutes = require("./routes/registerCourseRoutes");
const formsRoutes = require("./routes/formRoutes");
const registrationStatusRoutes = require("./routes/RegistrationStatusRoutes");

const { register } = require("module");
const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(express.json({ limit: "50mb" })); // Tăng giới hạn JSON lên 10MB
app.use(express.urlencoded({ limit: "50mb", extended: true }));

mongoose.connect(
  "mongodb+srv://hoabon1305:bon13052002@cluster0.4brq4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
app.use("/api/students", studentRoutes);
app.use("/api/schoolyears", schoolYearRoutes);
app.use("/api/points", pointRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/registerCourse", registerCourseRoutes);
app.use("/api/forms", formsRoutes);
app.use("/api/registrationStatus", registrationStatusRoutes);

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
