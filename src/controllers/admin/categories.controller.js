const Categories = require("../../models/categories.model");
const systemConfig = require("../../config/system");
module.exports.index = async (req, res) => {
  try {
    const find = {
      deleted: false,
    };
    const categories = await Categories.find(find);
    res.render("admin/pages/category/index.pug", {
      pageTitle: "Danh mục tour",
      categories,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.create = async (req, res) => {
  try {
    res.render("admin/pages/category/create.pug", {
      pageTitle: "Thêm danh mục",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.createPost = async (req, res) => {
  try {
    const categories = new Categories(req.body);
    await categories.save();
    req.flash("success", "Thêm thành công danh mục mới!");
  } catch (error) {
    res.flash("error", "Thêm mới danh mục thất bại!");
    console.log("error create category: ", error);
  } finally {
    res.redirect(`${systemConfig.prefixAdmin}/categories`);
  }
};
