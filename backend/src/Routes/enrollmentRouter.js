const Router = require("express");
const router = new Router();
const enrollmentController = require("../Controllers/enrollmentController");
const {check} = require("express-validator");
const roleMiddleware = require("../Middleware/roleMiddleware");

router.get('/enrollmentbystudent/', enrollmentController.getEnrollmentByStudent);
router.get('/enrollments', enrollmentController.getAllEnrollments);
router.get('/checkenrollment',  enrollmentController.checkEnrollment);
router.post('/enroll/add', enrollmentController.addEnrollment);
router.post('/enrollmentbystudent/add', enrollmentController.addEnrollmentByStudent);
router.delete('/enrollment/', enrollmentController.deleteEnrollment);

module.exports = router;
