const router = require("express").Router();
const controller = require("../../controllers/booking.controller");

router.post("/create_payment_url", controller.createPaymentUrl);
router.post("/checkout/:tourId", controller.checkout);
router.get("/vnpay_return", controller.vnpReturn);

module.exports = router;
