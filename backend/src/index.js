require("dotenv").config({ path: ".env" });
const express = require("express");
const cors = require("cors");

const DbClient = require("./Db/DbClient");
const authRouter = require("./Routes/authRouter");
const categoryRouter= require("./Routes/categoryRouter");
const courseRouter = require("./Routes/courseRouter");

//const cors = require('cors');

// const authRouter = require("./modules/auth/authRouter");

// const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware");
// const corsMiddleware = require("./middlewares/corsMiddleware");
const app = express();
app.use(cors());
app.options("*", cors());
app.use(express.json());
// router.use(authRouter);
app.use("/auth", authRouter);
app.use(categoryRouter);
app.use(courseRouter);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:9000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});
// app.use(corsMiddleware);
// app.use(express.json());
// app.use(express.static('media', {index: 'index.html'}));
// app.use("/auth", authRouter);
// app.use(errorHandlerMiddleware);

/*TODO add validation*/
/*TODO socket server*/
/*TODO sort by average rating users*/

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
