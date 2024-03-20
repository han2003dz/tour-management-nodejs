const Categories = require("../../models/categories.model");
const systemConfig = require("../../config/system");
const filterStatusHelper = require("../../helpers/filterStatus");
module.exports.index = async (req, res) => {
  try {
    const filterStatus = filterStatusHelper(req.query);
    const find = {
      deleted: false,
      ...(req.query.status && { status: req.query.status }),
    };
    const categories = await Categories.find(find);
    res.render("admin/pages/category/index.pug", {
      pageTitle: "Danh mục tour",
      categories,
      filterStatus,
    });
  } catch (error) {
    console.log("error index categories controller: ", error);
  }
};

module.exports.create = async (req, res) => {
  try {
    res.render("admin/pages/category/create.pug", {
      pageTitle: "Thêm danh mục",
    });
  } catch (error) {
    console.log("error create categories controller: ", error);
  }
};

module.exports.createPost = async (req, res) => {
  try {
    const categories = new Categories(req.body);
    await categories.save();
    req.flash("success", "Thêm thành công danh mục mới!");
  } catch (error) {
    req.flash("error", "Thêm mới danh mục thất bại!");
    console.log("error createPost categories controller: ", error);
  } finally {
    res.redirect(`${systemConfig.prefixAdmin}/categories`);
  }
};
