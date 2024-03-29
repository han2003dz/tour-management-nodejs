const router = require("express").Router();
const controller = require("../../controllers/client/priceTable.controller");
router.get("/", controller.index);
module.exports = router;