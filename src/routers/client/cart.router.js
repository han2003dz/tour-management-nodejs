const router = require("express").Router();
const controller = require("../../controllers/client/cart.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
router.get("/", controller.index);
router.post("/add/:tourId", authMiddleware, controller.addPost);
router.get("/delete/:tourId", controller.deleteItem);
router.get("/updateQuantityAdult/:tourId/:quantityAdult", controller.update);
router.get("/updateQuantityChild/:tourId/:quantityChild", controller.update);

module.exports = router;
