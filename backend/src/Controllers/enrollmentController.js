const { PrismaClient } = require("@prisma/client");
const DbClient = new PrismaClient();

class enrollmentController {
  async getEnrollmentByStudent(req, res) {
    try {
      const enrollments = await DbClient.enrollment.findMany({
        where: {
          user_id: parseInt(req.query.id),
        },
        include: {
          Course: true,
        },
      });
      res.send(enrollments);
    } catch (err) {
      res.status(500).send(err);
    }
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
      const enrollment = await DbClient.enrollment.findUnique({
        where: {
          user_id: Number(req.query.id),
          course_id: Number(req.query.courseid),
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
    } catch (err) {
      next(err);
    }
  }

  async addEnrollment(req, res) {
    if (!req.body) {
      return res.status(400).send("request body is missing");
    }

    try {
      const user = await DbClient.user.findUnique({
        where: { email: req.body.student },
      });

      const course = await DbClient.course.findUnique({
        where: { name: req.body.course },
      });

      const enrollment = await DbClient.enrollment.create({
        data: {
          user_id: user.id,
          course_id: course.id,
        },
      });

      res.status(200).send(enrollment);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async addEnrollmentByStudent(req, res) {
    try {
      const enroll = await DbClient.enrollment.create({
        data: {
          student: {
            connect: {
              email: req.body.student,
            },
          },
          course: {
            connect: {
              courseName: req.body.course,
            },
          },
          approved: true,
          checked: false,
        },
      });
      res.status(200).json(enroll);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Could not create enrollment" });
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
