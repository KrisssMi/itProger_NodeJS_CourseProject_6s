const Router = require("express");
const router = new Router();
const categoryController = require("../Controllers/categoryController");
const {check} = require("express-validator");
const roleMiddleware = require("../Middleware/roleMiddleware");

router.post('/category/add', categoryController.addCategory);
router.get('/categories', categoryController.getAllCategories);
router.get('/category/:id', categoryController.getCategoryById);
router.delete('/category/:id', roleMiddleware(["ADMIN"]), categoryController.deleteCategory);
router.put('/category/:id', roleMiddleware(["ADMIN"]), categoryController.updateCategory);

module.exports = router;