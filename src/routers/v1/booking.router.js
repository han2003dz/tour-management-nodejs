const router = require("express").Router();
const controller = require("../../controllers/booking.controller");

router.post("/create_payment_url", controller.createPaymentUrl);

router.get("/vnpay_return", controller.vnpReturn);


module.exports = router;
