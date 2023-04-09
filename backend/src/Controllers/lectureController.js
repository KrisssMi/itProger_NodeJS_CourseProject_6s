const { PrismaClient } = require("@prisma/client");
const DbClient = new PrismaClient();
const path = require("path");
const { uploadVideo } = require("./videoController.js");

class lectureController {
  async addLecture(req, res) {
    try {
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
          .status(400)
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
    } catch (error) {
      console.error(error);
      res.status(500).json("Server error");
    }
  }
}

module.exports = new lectureController();
