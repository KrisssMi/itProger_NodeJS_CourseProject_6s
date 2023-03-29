const { PrismaClient } = require("@prisma/client");
const DbClient = new PrismaClient();

class courseController {
  async addCourse(req, res) {
    try {
      const { name, categoryId } = req.body;
      const course = await DbClient.course.create({
        data: {
          name,
          description,

          categoryId: Number(categoryId),
        },
      });
      return res.json(course);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Course creation error" });
    }
  }

  async getAllCourses(req, res) {
    try {
      const courses = await DbClient.course.findMany();
      return res.send(courses);
    } catch (e) {
      console.log(e);
      res.status(400).send({ message: "Courses error" });
    }
  }

  async getCourseById(req, res) {
    try {
      const { id } = req.params;
      const course = await DbClient.course.findUnique({
        where: {
          id: Number(id),
        },
      });
      return res.send(course);
    } catch (e) {
      console.log(e);
      res.status(400).send({ message: "Course error" });
    }
  }

  async deleteCourse(req, res) {
    try {
      const { id } = req.params;
      const course = await DbClient.course.delete({
        where: {
          id: Number(id),
        },
      });
      return res.send(course);
    } catch (e) {
      console.log(e);
      res.status(400).send({ message: "Course deletion error" });
    }
  }

  async updateCourse(req, res) {
    try {
      const { id } = req.params;
      const { name, categoryId } = req.body;
      const course = await DbClient.course.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
          categoryId: Number(categoryId),
        },
      });
      return res.send(course);
    } catch (e) {
      console.log(e);
      res.status(400).send({ message: "Course update error" });
    }
  }
}

module.exports = new courseController();
