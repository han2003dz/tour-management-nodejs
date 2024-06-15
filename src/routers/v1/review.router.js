const router = require("express").Router();
const controller = require("../../controllers/review.controller");

router.post("/submit/:userId/:tourId", controller.addReview);

module.exports = router;
