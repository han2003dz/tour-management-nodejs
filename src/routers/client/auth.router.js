const router = require("express").Router();
const controller = require("../../controllers/client/auth.controller");

router.get("/login", controller.login);
router.post("/login", controller.loginPost);
router.get("/register", controller.register);
router.post("/register", controller.registerPost);
router.post("/refresh", controller.requestRefreshToken);
module.exports = router;
