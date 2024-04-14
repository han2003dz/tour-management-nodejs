const router = require("express").Router();
const controller = require("../../controllers/auth.controller");
router.get("/logout", controller.logout);
router.post("/login", controller.login);
router.post("/register", controller.register);
module.exports = router;
