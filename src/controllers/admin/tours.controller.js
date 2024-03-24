const Tours = require("../../models/tours.model");
const Categories = require("../../models/categories.model");
const systemConfig = require("../../config/system");
const priceNew = require("../../helpers/priceNew");
module.exports.index = async (req, res) => {
  try {
    const find = {
      deleted: false,
    };
    const tours = await Tours.find(find);
    const categories = await Categories.find({
      deleted: false,
      status: "active",
    });
    res.render("admin/pages/tour/index.pug", {
      pageTitle: "Tours",
      tours,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.redirect(`${systemConfig.prefixAdmin}`);
  }
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

module.exports.edit = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };
    const tour = await Tours.findOne(find);
    const categories = await Categories.find({ deleted: false });
    res.render("admin/pages/tour/edit.pug", {
      pageTitle: "Chỉnh sửa tour",
      tour,
      categories,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.editPatch = async (req, res) => {
  try {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    const updatedBy = {
      updatedAt: new Date(),
    };
    await Tours.updateOne(
      {
        _id: req.params.id,
      },
      { ...req.body, $push: { updatedBy: updatedBy } }
    );
    req.flash("success", "Cập nhật thành công!");
    res.redirect(`${systemConfig.prefixAdmin}/tours`);
  } catch (error) {
    req.error("error", "Cập nhật thất bại");
    res.redirect("back");
  }
};

module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };
    const tour = await Tours.findOne(find);
    tour.priceNew = priceNew.priceNewTour(tour);
    const category = await Categories.findOne({
      _id: tour.tour_category_id,
      deleted: false,
    });
    const categoryName = category.title;
    res.render("admin/pages/tour/detail.pug", {
      pageTitle: tour.title,
      tour,
      categoryName,
    });
  } catch (error) {
    console.log("error detail: ", error);
    req.flash("error", "Không thể xem chi tiết tour này!");
  }
};

module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await Tours.updateOne(
      { _id: id },
      { deleted: true },
      { deletedAt: new Date() }
    );
    req.flash("success", "Xóa thành công 1 tour!");
  } catch (error) {
    req.flash("error", "Xóa thất bại!");
    console.log("error delete tour", error);
  } finally {
    res.redirect("back");
  }
};
