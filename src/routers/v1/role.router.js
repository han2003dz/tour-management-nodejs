const router = require("express").Router();
const controller = require("../../controllers/roles.controller");
router.post("/create", controller.createPost);
router.patch("/edit/:id", controller.editPatch);
router.delete("/delete/:id", controller.deleteRole);
router.patch("/change-multi", controller.changeMulti);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/permissions", controller.permissionsPatch);

module.exports = router;
