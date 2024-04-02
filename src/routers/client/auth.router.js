const router = require("express").Router();
const controller = require("../../controllers/client/auth.controller");

router.get("/login", controller.login);
router.get("/register", controller.register);
router.post("/register", controller.registerPost);

module.exports = router;
