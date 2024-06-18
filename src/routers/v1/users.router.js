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

router.patch(
  "/edit/:id",
  upload.single("avatar"),
  uploadCloud.uploadSingle,
  controller.editPatch
);

router.post("/forgot-password", controller.forgotPassword);

router.post("/otp", controller.otpPost);
router.post("/reset-password", controller.resetPasswordPost);

router.get("/look-up-bill", controller.lookUpBill);

module.exports = router;
