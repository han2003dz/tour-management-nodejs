const router = require("express").Router();
const controller = require("../../controllers/auth.controller");
router.get("/login", controller.getLogin);
router.get("/register", controller.getRegister);
router.get("/logout", controller.logout);
module.exports = router;
