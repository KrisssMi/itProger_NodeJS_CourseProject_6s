const Router = require("express");
const router = new Router();
const courseController = require("../Controllers/courseController");
const {check} = require("express-validator");
const roleMiddleware = require("../Middleware/roleMiddleware");

router.post('/course/add', roleMiddleware(["ADMIN"]), courseController.addCourse);
router.get('/courses', courseController.getAllCourses);
router.get('/course/:id', courseController.getCourseById);
router.delete('/course/:id', roleMiddleware(["ADMIN"]), courseController.deleteCourse);
router.put('/course/:id', roleMiddleware(["ADMIN"]), courseController.updateCourse);

module.exports = router;