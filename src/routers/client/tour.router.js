const router = require("express").Router();
const controller = require("../../controllers/client/tour.controller");
router.get("/", controller.index);
router.get("/detail/:slugTour", controller.detail);
router.get("/:slugCategory", controller.category);
module.exports = router;
