const Router = require("express");
const router = new Router();
const enrollmentController = require("../Controllers/enrollmentController");
const {check} = require("express-validator");
const roleMiddleware = require("../Middleware/roleMiddleware");

router.get('/enrollmentbystudent/:id', roleMiddleware(["ADMIN"]), enrollmentController.getEnrollmentByStudent);
router.get('/enrollments', enrollmentController.getAllEnrollments);
router.get('/checkenrollment', roleMiddleware(["ADMIN"]), enrollmentController.checkEnrollment);
router.post('/enrollment/add', enrollmentController.addEnrollment);
router.post('/enrollmentbystudent/add', roleMiddleware(["ADMIN"]), enrollmentController.addEnrollmentByStudent);
router.delete('/enrollment', roleMiddleware(["ADMIN"]), enrollmentController.deleteEnrollment);

module.exports = router;
