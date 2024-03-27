const router = require("express").Router();
const controller = require("../../controllers/admin/auths.controller");
const { verifyToken } = require("../../middlewares/admin/auth.middleware");
router.post("/login", controller.login);
router.post("/refreshToken", controller.requestRefreshToken);
router.post("/logout", verifyToken, controller.logout);
module.exports.router;
