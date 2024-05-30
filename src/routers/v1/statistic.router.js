const router = require("express").Router();
const controller = require("../../controllers/statistic.controller");
router.get("/", controller.statistic);
module.exports = router;
