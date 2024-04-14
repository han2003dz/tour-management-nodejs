const router = require("express").Router();
const controller = require("../../controllers/users.controller");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const multer = require("multer");
const upload = multer();

router.post(
  "/create",
  upload.single("avatar"),
  uploadCloud.uploadSingle,
  controller.createPost
);
module.exports = router;
