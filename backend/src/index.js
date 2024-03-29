require("dotenv").config({ path: ".env" }); // загрузка переменных из файла .env
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const { initWS } = require("./ws/websocket.js");

var key = fs.readFileSync(process.env.PRIVATE_KEY_PATH, "utf8");
var cert = fs.readFileSync(process.env.PRIMARY_CERT_PATH, "utf8");

var options = {
  key: key,
  cert: cert,
};

var https = require("https");

const authRouter = require("./Routes/authRouter");
const categoryRouter = require("./Routes/categoryRouter");
const courseRouter = require("./Routes/courseRouter");
const lectureRouter = require("./Routes/lectureRouter");
const videoRouter = require("./Routes/videoRouter");
const enrollmentRouter = require("./Routes/enrollmentRouter");
const profileRouter = require("./Routes/profileRouter");
const notificationRouter = require("./Routes/notificationRouter");

const app = express();

// Путь к директории со статическими файлами
const staticPath = path.join(__dirname, "static");
// Использование express.static
app.use(express.static(staticPath));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.options("*", cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use(categoryRouter);
app.use(courseRouter);
app.use(lectureRouter);
app.use(videoRouter);
app.use(enrollmentRouter);
app.use("/profile", profileRouter);
app.use(profileRouter);
app.use(notificationRouter);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
});

const httpsServer = https
  .createServer(options, app)
  .listen(process.env.PORT, () => {
    console.log(`Server started on port: ${process.env.PORT}`);
  });

const wsServer = initWS(httpsServer);
