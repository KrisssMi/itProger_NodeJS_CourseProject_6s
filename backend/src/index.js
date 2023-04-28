require("dotenv").config({ path: ".env" });
const express = require("express");
const cors = require("cors");
const path = require("path");

const authRouter = require("./Routes/authRouter");
const categoryRouter = require("./Routes/categoryRouter");
const courseRouter = require("./Routes/courseRouter");
const lectureRouter = require("./Routes/lectureRouter");
const videoRouter = require("./Routes/videoRouter");
const enrollmentRouter = require("./Routes/enrollmentRouter");
const profileRouter = require("./Routes/profileRouter");

const app = express();

// Путь к директории со статическими файлами
const staticPath = path.join(__dirname, "static");
console.log(staticPath);
// Использование express.static
app.use(express.static(staticPath));

app.use(cors());
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

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
});

const bootstrap = () => {
  try {
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port: ${process.env.PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

bootstrap();
