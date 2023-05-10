const Router = require("express");
const router = new Router();
const notificationController = require("../Controllers/notificationController");
const roleMiddleware = require("../Middleware/roleMiddleware");

// router.post("/notification/add", notificationController.addNotification);
router.get("/notifications", notificationController.getAllNotifications);

module.exports = router;
