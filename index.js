const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const app = express();
const path = require("path");
const crypto = require("crypto");
const axios = require("axios");
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
const PaymentMomo = require("./models/paymentMomo");
const { register } = require("module");
const paymentMomoRoutes = require("./routes/paymentMomoRoutes");
const registerCourse = require("./models/registerCourseModel");
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

const config = {
  accessKey: "F8BBA842ECF85",
  secretKey: "K951B6PE1waDMi640xX08PD3vg6EkVlz",
  orderInfo: "Thanh toán tour với MoMo",
  partnerCode: "MOMO",
  redirectUrl: "http://localhost:3000/dashboard",
  ipnUrl:
    "https://3b27-2001-ee0-4b74-cbd0-342a-f201-8657-5f1b.ngrok-free.app/callback",
  requestType: "captureWallet",
  extraData: "",
  orderGroupId: "",
  autoCapture: true,
  lang: "vi",
};

app.post("/payment", async (req, res) => {
  const { courses, semester, amount, student } = req.body;

  let {
    accessKey,
    secretKey,
    orderInfo,
    partnerCode,
    redirectUrl,
    ipnUrl,
    requestType,
    extraData,
    orderGroupId,
    autoCapture,
    lang,
  } = config;

  var orderId = partnerCode + new Date().getTime();
  var requestId = orderId;

  const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  const requestBody = JSON.stringify({
    partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId,
    amount,
    orderId,
    orderInfo,
    redirectUrl,
    ipnUrl,
    lang,
    requestType,
    autoCapture,
    extraData,
    orderGroupId,
    signature,
  });

  const options = {
    method: "POST",
    url: "https://test-payment.momo.vn/v2/gateway/api/create",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
    data: requestBody,
  };

  // options for axios

  // Send the request and handle the response
  try {
    const result = await axios(options);
    const data = result.data;
    if (data.payUrl) {
      const newPaymentMomo = new PaymentMomo({
        orderId: data.orderId,
        courses: courses,
        semester: semester,
        student: student,
      });
      await newPaymentMomo.save();
    } else {
      console.error("Failed to generate MoMo payment URL:", data);
      return res
        .status(500)
        .json({ message: "Failed to generate MoMo payment URL", data });
    }
    return res.status(200).json(result.data);
  } catch (error) {
    return res.status(500).json({ statusCode: 500, message: error.message });
  }
});

app.post("/callback", async (req, res) => {
  const { resultCode, orderId } = req.body;

  try {
    if (!orderId) {
      return res.status(400).json({ message: "orderId is required" });
    }

    const paymentMomo = await PaymentMomo.findOne({
      orderId: orderId,
    });
    if (!paymentMomo) {
      return res.status(404).json({ message: "Payment not found" });
    }
    if (resultCode === 0) {
      paymentMomo.courses = paymentMomo.courses.map((item) => ({
        ...item,
        paymentStatus: true,
      }));
      paymentMomo.pay = req.body;

      const courseIdsFromPaymentMomo = paymentMomo.courses.map(
        (item) => item.course._id
      );

      // Cập nhật paymentStatus trong bảng registerCourse
      await registerCourse.updateMany(
        { "course._id": { $in: courseIdsFromPaymentMomo } },
        { $set: { paymentStatus: true, datePayment: new Date() } }
      );

      await paymentMomo.save();
    } else {
      paymentMomo.pay = [];
      return res
        .status(400)
        .json({ message: "Thanh toán thất bại hoặc bị hủy" });
    }
  } catch (error) {
    console.error("Error processing callback:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
  /**
    resultCode = 0: giao dịch thành công.
    resultCode = 9000: giao dịch được cấp quyền (authorization) thành công .
    resultCode <> 0: giao dịch thất bại.
   */
  /**
   * Dựa vào kết quả này để update trạng thái đơn hàng
   * Kết quả log:
   * {
        partnerCode: 'MOMO',
        orderId: 'MOMO1712108682648',
        requestId: 'MOMO1712108682648',
        amount: 10000,
        orderInfo: 'pay with MoMo',
        orderType: 'momo_wallet',
        transId: 4014083433,
        resultCode: 0,
        message: 'Thành công.',
        payType: 'qr',
        responseTime: 1712108811069,
        extraData: '',
        signature: '10398fbe70cd3052f443da99f7c4befbf49ab0d0c6cd7dc14efffd6e09a526c0'
      }
   */

  return res.status(204).json(req.body);
});

app.post("/check-status-transaction", async (req, res) => {
  const { orderId } = req.body;

  // const signature = accessKey=$accessKey&orderId=$orderId&partnerCode=$partnerCode
  // &requestId=$requestId
  var secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  var accessKey = "F8BBA842ECF85";
  const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;

  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  const requestBody = JSON.stringify({
    partnerCode: "MOMO",
    requestId: orderId,
    orderId: orderId,
    signature: signature,
    lang: "vi",
  });

  // options for axios
  const options = {
    method: "POST",
    url: "https://test-payment.momo.vn/v2/gateway/api/query",
    headers: {
      "Content-Type": "application/json",
    },
    data: requestBody,
  };

  const result = await axios(options);

  return res.status(200).json(result.data);
});

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
app.use("/api/paymentMomo", paymentMomoRoutes);

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
