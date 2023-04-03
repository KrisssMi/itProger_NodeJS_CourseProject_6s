const Router = require("express");
const router = new Router();
const lectureController = require("../Controllers/lectureController");
const {check} = require("express-validator");
const roleMiddleware = require("../Middleware/roleMiddleware");

router.post('/lecture/add', roleMiddleware(["ADMIN"]), lectureController.addLecture);
// router.get('/lectures', lectureController.getAllLectures);
// router.get('/lecture/:id', lectureController.getLectureById);
// router.delete('/lecture/:id', roleMiddleware(["ADMIN"]), lectureController.deleteLecture);
// router.put('/lecture/:id', roleMiddleware(["ADMIN"]), lectureController.updateLecture);

module.exports = router;
