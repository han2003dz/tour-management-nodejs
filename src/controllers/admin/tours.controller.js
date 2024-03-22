const Tours = require("../../models/tours.model");
const Categories = require("../../models/categories.model");
const systemConfig = require("../../config/system");
module.exports.index = (req, res) => {
  res.render("admin/pages/tour/index.pug", {
    pageTitle: "Tours",
  });
};

module.exports.create = async (req, res) => {
  try {
    const findCategories = {
      deleted: false,
      status: "active",
    };
    const categories = await Categories.find(findCategories);
    res.render("admin/pages/tour/create.pug", {
      pageTitle: "Thêm mới tour",
      categories,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.createPost = async (req, res) => {
  try {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    const tour = new Tours(req.body);
    await tour.save();
    req.flash("success", "Thêm thành công tour mới!");
  } catch (error) {
    console.log("error: ", error);
    req.flash("error", "Không thêm được tour mới!");
  }
  res.redirect(`${systemConfig.prefixAdmin}/tours/create`);
};
