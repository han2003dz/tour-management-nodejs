const router = require("express").Router();
const controller = require("../../controllers/booking.controller");
router.post("/checkout/:tourId", controller.checkout);
router.get("/vnpay_return", controller.vnpReturn);
router.delete("/cancel/:id", controller.cancelTrip);
module.exports = router;
