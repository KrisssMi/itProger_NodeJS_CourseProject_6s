const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const DbClient = new PrismaClient();

class notificationController {
  async getAllNotifications(req, res) {
    try {
      const authorizationHeader = req.headers.authorization;
      if (authorizationHeader) {
        const tokenArray = authorizationHeader.split(" ");
        if (tokenArray.length === 2) {
          const token = tokenArray[1];
          const decodedToken = jwt.verify(token, process.env.SECRET);
          const roles = decodedToken.roles;
          if (!roles.includes("USER")) {
            return res.status(403).json("You don't have enough rights");
          }
          const notifications = await DbClient.notification.findMany({
            select: {
              id: true,
              date: true,
              content: true,
              // Добавляем поле "Course" и внутри него выбираем поле "name"
              course: {
                select: {
                  name: true,
                },
              },
            },
          });
          return res.send(notifications);
        }
      }
    }
    catch (err) {
      console.log(err);
      res.status(400).send({ message: "Notifications error" });
    }
  }
}

module.exports = new notificationController();
