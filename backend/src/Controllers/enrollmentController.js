const { PrismaClient } = require("@prisma/client");
const DbClient = new PrismaClient();
const jwt = require("jsonwebtoken");

class enrollmentController {
  async getEnrollmentByStudent(req, res) {
    const enrollments = await DbClient.enrollment.findMany({
      where: {
        User: {
          id: parseInt(req.query.id), // Преобразуем id в число, если это необходимо
        },
      },
      include: {
        Course: true, // Включаем связанную модель Course
      },
    });
    res.json(enrollments);
  }
  catch(err) {
    res.status(500).json(err);
  }

  async getAllEnrollments(req, res) {
    try {
      const enrollments = await DbClient.enrollment.findMany({
        select: {
          id: true,
          approved: true,
          User: {
            select: {
              email: true,
            },
          },
          Course: {
            select: {
              name: true,
            },
          },
        },
      });
      return res.json(enrollments);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Enrollments error" });
    }
  }

  async checkEnrollment(req, res) {
    try {
      const authorizationHeader = req.headers.authorization;
      let id; // Объявляем переменную id
      if (authorizationHeader) {
        const tokenArray = authorizationHeader.split(" ");
        if (tokenArray.length === 1) {
          const token = tokenArray[0];
          const decodedToken = jwt.verify(token, process.env.SECRET);
          id = decodedToken.id;
        } else {
          console.error("Invalid Authorization header format");
        }
        const user = await DbClient.user.findFirst({
          where: {
            id: id,
          },
        });
        console.log(user);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        const enrollment = await DbClient.enrollment.findFirst({
          where: {
            user_id: id, // здесь я должна передавать полученный id из токена в req.query
            course_id: Number(req.query.courseid) || 0,
          },
          include: {
            Course: {
              select: {
                name: true,
              },
            },
          },
        });
        res.json(enrollment);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  async addEnrollment(req, res) {
    // Проверяем наличие тела запроса
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send("request body is missing");
    }
    try {
      // Используем Prisma для поиска пользователя и курса по имени
      const student = await DbClient.user.findFirst({
        where: {
          email: req.body.student,
        },
      });

      const course = await DbClient.course.findFirst({
        where: {
          name: req.body.course,
        },
      });

      if (!student || !course) {
        return res.status(404).send("Student or Course not found");
      }
      // Создаем новую запись Enrollment
      const enrollment = await DbClient.enrollment.create({
        data: {
          user_id: student.id, // Используем найденный id студента
          course_id: course.id, // Используем найденный id курса
          approved: req.body.approved || false,
          checked: req.body.checked || false,
        },
      });
      res.status(200).json(enrollment);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  async addEnrollmentByStudent(req, res) {
    // Проверяем наличие тела запроса
    if (!req.body) {
      return res.status(400).send("request body is missing");
    }
    try {
      const authorizationHeader = req.headers.authorization;
      let id;
      if (authorizationHeader) {
        const tokenArray = authorizationHeader.split(" ");
        if (tokenArray.length === 1) {
          const token = tokenArray[0];
          const decodedToken = jwt.verify(token, process.env.SECRET);
          id = decodedToken.id;
        } else {
          console.error("Invalid Authorization header format");
        }
        const user = await DbClient.user.findFirst({
          where: {
            id: id,
          },
        });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        // Создаем новую запись Enrollment
        const enrollment = await DbClient.enrollment.create({
          data: {
            User: { connect: { id: Number(user.id) } },
            Course: { connect: { id: Number(req.params.courseId) } },
            approved: req.body.approved || false,
            checked: req.body.checked || false,
          },
        });
        res.status(200).json(enrollment);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  async deleteEnrollment(req, res) {
    try {
      const id = parseInt(req.query.id);
      const deletedEnrollment = await DbClient.enrollment.delete({
        where: {
          id: Number(id),
        },
      });
      res.json(deletedEnrollment);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteEnrollmentByStudent(req, res) {
    try {
      const authorizationHeader = req.headers.authorization;
      let id;
      if (authorizationHeader) {
        const tokenArray = authorizationHeader.split(" ");
        if (tokenArray.length === 1) {
          const token = tokenArray[0];
          const decodedToken = jwt.verify(token, process.env.SECRET);
          id = decodedToken.id;
        } else {
          console.error("Invalid Authorization header format");
        }
        const user = await DbClient.user.findFirst({
          where: {
            id: id,
          },
        });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        const courseId = Number(req.params.courseId);
        if (isNaN(courseId)) {
          return res.status(400).json({ error: "Invalid course ID" });
        }

        const findEnrollment = await DbClient.enrollment.findFirst({
          where: {
            Course: { id: courseId },
            User: { id: user.id },
          },
        });
        if (!findEnrollment) {
          return res.status(404).json({ error: "Enrollment not found" });
        }

        // Удаляем запись Enrollment
        const enrollment = await DbClient.enrollment.delete({
          where: {
            id: findEnrollment.id,
          },
        });
        console.log(enrollment);
        res.status(200).json(enrollment);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
}

module.exports = new enrollmentController();
