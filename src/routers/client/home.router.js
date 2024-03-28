const router = require("express").Router();
const controller = require("../../controllers/client/home.controller");
router.get("/", controller.home);
// router.get("/:slugCategory", controller.home);

module.exports = router;
