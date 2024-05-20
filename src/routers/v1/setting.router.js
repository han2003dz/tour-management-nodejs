const router = require("express").Router();
const controller = require("../../controllers/settings.controller");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const multer = require("multer");
const upload = multer();
router.patch(
  "/general",
  upload.single("logo"),
  uploadCloud.uploadSingle,
  controller.generalPatch
);
module.exports = router;
