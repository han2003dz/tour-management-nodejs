const router = require("express").Router();
const controller = require("../../controllers/client/cart.controller");
router.get("/", controller.index);
router.post("/add/:tourId", controller.addPost);
router.get("/delete/:tourId", controller.deleteItem);

module.exports = router;
