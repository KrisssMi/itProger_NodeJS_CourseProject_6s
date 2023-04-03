const { PrismaClient } = require("@prisma/client");
const DbClient = new PrismaClient();

class enrollmentController {
  async getEnrollmentByStudent() {
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

  async getAllEnrollments() {
    try {
      const enrollments = await DbClient.enrollment.findMany({
        include: {
          User: true,
          Course: {
            select: {
              courseName: true,
            },
          },
        },
      });
      res.json(enrollments);
    } catch (err) {
      next(err);
    }
  }

  async checkEnrollment() {
    try {
      const enrollment = await DbClient.enrollment.findUnique({
        where: {
          user_id: Number(req.query.id),
          course_id: Number(req.query.courseid),
        },
        include: {
          Course: {
            select: {
              courseName: true,
            },
          },
        },
      });
      res.json(enrollment);
    } catch (err) {
      next(err);
    }
  }

  async addEnrollment() {
    if (!req.body) {
      return res.status(400).send("request body is missing");
    }

    try {
      const user = await DbClient.user.findUnique({
        where: { email: req.body.student },
      });

      const course = await DbClient.course.findUnique({
        where: { courseName: req.body.course },
      });

      const enrollment = await DbClient.enrollment.create({
        data: {
          user: { connect: { id: user.id } },
          course: { connect: { id: course.id } },
        },
      });

      res.status(200).send(enrollment);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async addEnrollmentByStudent() {
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

  async deleteEnrollment() {
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
