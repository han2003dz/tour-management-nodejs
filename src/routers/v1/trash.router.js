const express = require("express");
const router = express.Router();
const controller = require("../../controllers/trash.controller");
router.patch("/update/:id", controller.updateTour);
module.exports = router;
