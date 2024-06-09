const router = require("express").Router();
const controller = require("../../controllers/review.controller");

router.post("/submit/:slugTour", controller.addReview);

module.exports = router;
