const { PrismaClient } = require("@prisma/client");
const DbClient = new PrismaClient();

class courseController {
  async addCourse(req, res) {
    try {
      // Поиск категории по имени
      const category = await DbClient.category.findUnique({
        where: {
          name: req.body.category,
        },
      });
      // Создание курса и привязка к категории
      const createdCourse = await DbClient.course.create({
        data: {
          name: req.body.name,
          description: req.body.description,
          Category: {
            connect: {
              // Привязка к категории
              id: category.id, // Поиск категории по id
            },
          },
        },
      });
      console.log(
        `Created course with name: ${createdCourse.name} and description: ${createdCourse.description}`
      );
      res.send(createdCourse);
    } catch (e) {
      console.log(e);
      res.status(400).send({ message: "Course creation error" });
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
      if (!course) {
        return res.status(404).send("Course with this id not found.");
      }

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
      const { name, description } = req.body;
      const category = await DbClient.category.findUnique({
        where: {
          name: req.body.category,
        },
      });

      const course = await DbClient.course.update({
        where: {
          id: Number(id),
        },
        data: {
          name: name,
          description: description,
          Category: {
            connect: {
              id: category.id,
            },
          },
        },
      });
      if (!course) {
        return res.status(404).send("Course with this id not found.");
      }
      return res.send(course);
    } catch (e) {
      console.log(e);
      res.status(400).send({ message: "Course error" });
    }
  }
}

module.exports = new courseController();
