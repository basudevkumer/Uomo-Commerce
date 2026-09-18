const { Router } = require("express");
const authenticate = require("../middleware/authenticate.js");
const authorize = require("../middleware/authorize.js");
const admin = require("../controllers/admin.controller.js");

const router = Router();
router.use(authenticate, authorize("admin"));

router.get("/users", admin.listUsers);
router.patch("/users/:id", admin.updateUser);
router.delete("/users/:id", admin.deleteUser);

router.get("/categories", admin.listCategories);
router.post("/categories", admin.createCategory);
router.patch("/categories/:id", admin.updateCategory);
router.delete("/categories/:id", admin.deleteCategory);

router.get("/products", admin.listProducts);
router.post("/products", admin.createProduct);
router.patch("/products/:id", admin.updateProduct);
router.delete("/products/:id", admin.deleteProduct);

module.exports = router;
