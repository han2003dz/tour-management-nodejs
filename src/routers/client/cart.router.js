const router = require("express").Router();
const controller = require("../../controllers/client/cart.controller");
router.get("/", controller.index);
router.post("/add/:tourId", controller.addPost);
router.get("/delete/:tourId", controller.deleteItem);
router.get("/updateQuantityAdult/:tourId/:quantityAdult", controller.update);
router.get("/updateQuantityChild/:tourId/:quantityChild", controller.update);


module.exports = router;
