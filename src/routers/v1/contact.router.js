const router = require("express").Router();
const controller = require("../../controllers/contact.controller");
router.post("/submit", controller.contactSubmitPost);
module.exports = router;
