const router = require("express").Router();
const controller = require("../../controllers/cart.controller");

router.post("/add/:tourId", controller.addPost);
router.get("/delete/:tourId", controller.deleteItem);

module.exports = router;
