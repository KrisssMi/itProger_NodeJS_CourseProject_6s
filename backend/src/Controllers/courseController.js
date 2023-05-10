const { PrismaClient } = require("@prisma/client");
const DbClient = new PrismaClient();
const { getWS } = require("../ws/websocket");

class courseController {
  async addCourse(req, res) {
    try {
      // Поиск категории по имени
      const category = await DbClient.category.findUnique({
        where: {
          name: req.body.category,
        },
      });

      // Check if the course name already exists
      const existingCourse = await DbClient.course.findFirst({
        where: {
          name: req.body.name,
        },
      });
      if (existingCourse) {
        // Return an error response if the course already exists
        return res.status(409).json("Course with this name already exists.");
      }

      // Создание курса и привязка к категории
      const createdCourse = await DbClient.course.create({
        data: {
          name: req.body.name,
          description: req.body.description,
          Category: {
            connect: {
              id: category.id, // Поиск категории по id
            },
          },
        },
      });
      console.log(
        `Created course with name: ${createdCourse.name} and description: ${createdCourse.description}`
      );
      const createdNotification = await DbClient.Notification.create({
        data: {
          courseId: createdCourse.id,
          date: new Date(),
          content: `Admin has created a new course: ${createdCourse.name}`,
        },
      });
      if (createdNotification) {
        let IO = getWS();
        IO.emit("new-notification", { createdNotification });
      }
      res.send(createdCourse);
    } catch (e) {
      console.log(e);
      res.status(400).send({ message: "Course creation error" });
    }
  }

  async getAllCourses(req, res) {
    try {
      const courses = await DbClient.course.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          // Добавляем поле "category" и внутри него выбираем поле "name"
          Category: {
            select: {
              name: true,
            },
          },
        },
      });
      return res.send(courses);
    } catch (e) {
      console.log(e);
      res.status(400).send({ message: "Courses error" });
    }
  }

  async getCourseById(req, res) {
    try {
      const { id } = req.query;
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
      const { id } = req.query;
      const course = await DbClient.course.delete({
        where: {
          id: Number(id),
        },
      });
      return res.json(course);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Course deletion error" });
    }
  }

  async deleteCoursesByCategory(req, res) {
    try {
      const { id } = req.query;
      const courses = await DbClient.course.findMany({
        where: {
          category: Number(id),
        },
      });

      if (!courses || courses.length === 0) {
        return res.status(404).send("No courses found for this category.");
      }

      // Удаление всех найденных курсов
      await DbClient.course.deleteMany({
        where: {
          category: Number(id),
        },
      });
      return res.send({
        message: `Courses for category with id ${id} successfully deleted.`,
      });
    } catch (e) {
      console.log(e);
      res.status(400).send({ message: "Error deleting courses by category" });
    }
  }

  async updateCourse(req, res) {
    try {
      const { id } = req.query;
      const { name, description, category } = req.body; // Update to include category in req.body

      // Check if the course name already exists
      const existingCourse = await DbClient.course.findUnique({
        where: {
          name,
        },
      });
      if (existingCourse) {
        // Return an error response if the course already exists
        return res.status(409).send("Course with this name already exists.");
      }

      const course = await DbClient.course.update({
        where: {
          id: parseInt(id), // Parse id as integer
        },
        data: {
          name: name,
          description: description,
          Category: {
            // Update to include category field in data
            connect: {
              id: category, // Update to use req.body.category directly
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
