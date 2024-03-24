const express = require("express");
const router = express.Router();
const multer = require("multer");
const controller = require("../../controllers/admin/tours.controller");
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
router.get("/", controller.index);

router.get("/create", controller.create);
router.post(
  "/create",
  upload.fields([{ name: "images", maxCount: 10 }]),
  uploadCloud.uploadFields,
  controller.createPost
);

router.get("/edit/:id", controller.edit);
router.patch(
  "/edit/:id",
  upload.fields([{ name: "images", maxCount: 10 }]),
  uploadCloud.uploadFields,
  controller.editPatch
);
module.exports = router;
