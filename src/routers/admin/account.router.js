const router = require("express").Router();
const controller = require("../../controllers/admin/accounts.controller");
router.get("/", controller.index);
router.get("/create", controller.create);
router.post("/create", controller.createPost);
module.exports = router;
