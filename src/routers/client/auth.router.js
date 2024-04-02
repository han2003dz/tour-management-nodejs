const router = require("express").Router();
const controller = require("../../controllers/client/auth.controller");
router.get("/login", controller.login);

module.exports = router;
