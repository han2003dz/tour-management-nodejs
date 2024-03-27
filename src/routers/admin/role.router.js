const router = require("express").Router();
const controller = require("../../controllers/admin/roles.controller");
router.get("/", controller.index);
router.get("/create", controller.create);
router.post("/create", controller.createPost);
router.get("/detail/:id", controller.detail);
module.exports = router;
