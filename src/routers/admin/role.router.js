const router = require("express").Router();
const controller = require("../../controllers/admin/roles.controller");

router.get("/", controller.index);
router.get("/create", controller.create);
router.post("/create", controller.createPost);
router.get("/detail/:id", controller.detail);
router.get("/edit/:id", controller.edit);
router.patch("/edit/:id", controller.editPatch);
router.delete("/delete/:id", controller.deleteRole);

module.exports = router;
