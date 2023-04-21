const Router = require("express");
const router = new Router();
const authController = require("../Controllers/authController");
const {check} = require("express-validator");
const roleMiddleware = require("../Middleware/roleMiddleware");
const authMiddleware = require("../Middleware/authMiddleware");

router.post('/registration', [
    check('email', "Email is not correct").isEmail(),
    check('password', "Password must be longer than 3 and shorter than 12").isLength({min: 3, max: 12})
], authController.registration);
router.post('/login', authController.login);
router.get("/users", authController.getUsers);
router.get("/is-admin", authController.isAdmin);
router.get("/currentUser", authController.currentUser);
router.get("/user", authController.getUserById);
router.put("/user", authController.updateUser);

module.exports = router;
