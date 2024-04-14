const router = require("express").Router();
const multer = require("multer");
const controller = require("../../controllers/categories.controller");
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.post(
  "/create",
  upload.fields([{ name: "images", maxCount: 10 }]),
  uploadCloud.uploadFields,
  controller.createPost
);
router.patch(
  "/edit/:id",
  upload.fields([{ name: "images", maxCount: 10 }]),
  uploadCloud.uploadFields,
  controller.editPatch
);
router.delete("/delete/:id", controller.deleteRecord);

router.patch("/change-multi", controller.changeMulti);
router.patch("/change-status/:status/:id", controller.changeStatus);

module.exports = router;
