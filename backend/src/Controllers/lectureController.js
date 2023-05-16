const { PrismaClient } = require("@prisma/client");
const DbClient = new PrismaClient();
const path = require("path");
const { uploadVideo } = require("./videoController.js");
const jwt = require("jsonwebtoken");

class lectureController {
  async addLecture(req, res) {
    try {
      const authorizationHeader = req.headers.authorization;
      // проверка, что пользователь авторизован:
      if (!authorizationHeader) {
        return res.status(401).json("You are not authorized");
      }
      if (authorizationHeader) {
        const tokenArray = authorizationHeader.split(" ");
        if (tokenArray.length === 2) {
          const token = tokenArray[1];
          let decodedToken;
          try {
            decodedToken = jwt.verify(token, process.env.SECRET);
          } catch (err) {
            return res.status(401).json({ message: "Invalid token" });
          }
          const roles = decodedToken.roles;
          if (!roles.includes("ADMIN")) {
            return res.status(403).json("You don't have enough rights");
          }
          const videoLink = await uploadVideo(req, res);
          const course = await DbClient.course.findFirst({
            where: {
              name: req.body.course,
            },
          });

          if (!course) {
            res.status(400).json("This course doesn't exist");
            return;
          }

          if (
            await DbClient.lecture.findFirst({
              where: {
                name: req.body.name,
                Course: {
                  id: course.id,
                },
              },
            })
          ) {
            res
              .status(409)
              .json("Lecture with this name already exists in this course");
            return;
          }

          const upload = await DbClient.lecture.create({
            data: {
              name: req.body.name,
              content: req.body.content,
              videoLink,
              Course: {
                connect: {
                  id: course.id,
                },
              },
            },
          });
          res.status(201).json({ upload });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json("Server error");
    }
  }

  async getAllLectures(req, res) {
    try {
      const lectures = await DbClient.lecture.findMany({
        where: { course_id: Number(req.query.id) },
        include: { Course: { select: { description: true } } },
      });

      res.json(lectures);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
}

module.exports = new lectureController();
