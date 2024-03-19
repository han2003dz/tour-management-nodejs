const Tour = require("../../models/tours.model");
const systemConfig = require("../../config/system");
module.exports.index = (req, res) => {
  res.render("admin/pages/tour/index.pug", {
    pageTitle: "Tours",
  });
};

module.exports.create = (req, res) => {
  try {
    res.render("admin/pages/tour/create.pug", {
      pageTitle: "Thêm mới tour",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.createPost = async (req, res) => {
  try {
    // req.body.price = parseInt(req.body.price);
    // req.body.discountPercentage = parseInt(req.body.discountPercentage);
    // req.body.stock = parseInt(req.body.stock);
    // const tour = new Tour(req.body);
    // await tour.save();
    // req.flash("success", "Thêm thành công tour mới!");
    console.log(req.body);
  } catch (error) {
    console.log("error: ", error);
    req.flash("error", "Không thêm được tour mới!");
  }
  res.redirect(`${systemConfig.prefixAdmin}/tours/create`);
};
