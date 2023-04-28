const { PrismaClient } = require("@prisma/client");
const DbClient = new PrismaClient();

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
      const enrollments = await DbClient.enrollment.findMany();
      return res.json(enrollments);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Enrollments error" });
    }
  }

  async checkEnrollment(req, res) {
    try {
      const enrollment = await DbClient.enrollment.findFirst({
        where: {
          user_id: Number(req.query.id) || 0,
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
      res.status(500).json(err);
    }
  }

  async addEnrollmentByStudent(req, res) {
    // Проверяем наличие тела запроса
    if (!req.body) {
      return res.status(400).send("request body is missing");
    }
    try {
      // Создаем новую запись Enrollment
      const enrollment = await DbClient.enrollment.create({
        data: {
          User: { connect: { id: req.body.user_id } },
          Course: { connect: { id: req.body.course_id } },
          approved: req.body.approved || false,
          checked: req.body.checked || false,
        },
      });
      console.log(enrollment);
      res.status(200).json(enrollment);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async deleteEnrollment(req, res) {
    try {
      const deletedEnrollment = await DbClient.enrollment.delete({
        where: {
          id: parseInt(req.query.id),
        },
      });
      res.json(deletedEnrollment);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new enrollmentController();
