require("dotenv").config({ path: ".env" });
const express = require("express");
const cors = require("cors");

const authRouter = require("./Routes/authRouter");
const categoryRouter = require("./Routes/categoryRouter");
const courseRouter = require("./Routes/courseRouter");
const lectureRouter = require("./Routes/lectureRouter");
const videoRouter=require("./Routes/videoRouter");

const app = express();
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use(categoryRouter);
app.use(courseRouter);
app.use(lectureRouter);
app.use(videoRouter);


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:9000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

// app.use(express.static('media', {index: 'index.html'}));

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
