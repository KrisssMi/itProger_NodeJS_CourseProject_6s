const { PrismaClient } = require("@prisma/client");
const DbClient = new PrismaClient();
const path = require('path');

class lectureController {
  async addLecture(req, res) {
    const videoLink = req.file ? path.join('./src/static', req.file.filename) : null; // путь к загруженному видео
    try {
      const course = await DbClient.course.findFirst({
        where: {
          name: req.body.course,
        },
      });
      if (course) {
        req.body.Course = {
          connect: {
            id: course.id,
          },
        };
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
      console.log(upload.name);
      res.status(201).send({data: upload});
      console.log(upload);
      return upload;
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
}

module.exports = new lectureController();
