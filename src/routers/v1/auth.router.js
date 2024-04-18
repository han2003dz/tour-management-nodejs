const router = require("express").Router();
const controller = require("../../controllers/auth.controller");
router.get("/logout", controller.logout);
router.get("/logoutAdmin", controller.logoutAdmin);
router.post("/login", controller.login);
router.post("/loginAdmin", controller.loginAdmin);
router.post("/register", controller.register);
module.exports = router;
