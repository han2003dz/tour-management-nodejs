const Categories = require("../../models/categories.model");
const systemConfig = require("../../config/system");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
module.exports.index = async (req, res) => {
  try {
    const filterStatus = filterStatusHelper(req.query);
    const objectSearch = searchHelper(req.query);
    const find = {
      deleted: false,
      ...(req.query.status && { status: req.query.status }),
      ...(objectSearch.regex && { title: objectSearch.regex }),
    };
    const categories = await Categories.find(find);
    res.render("admin/pages/category/index.pug", {
      pageTitle: "Danh mục tour",
      categories,
      filterStatus,
      keyword: objectSearch.keyword,
    });
  } catch (error) {
    console.log("error index categories controller: ", error);
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
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

module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };
    const category = await Categories.findOne(find);
    res.render("admin/pages/category/detail.pug", {
      pageTitle: category.title,
      category,
    });
  } catch (error) {
    console.log("error detail categories controller", error);
  }
};

module.exports.edit = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };
    const category = await Categories.findOne(find);
    res.render("admin/pages/category/edit.pug", {
      pageTitle: category.title,
      category,
    });
  } catch (error) {
    console.log("error edit categories controller", error);
    res.redirect(`${systemConfig.prefixAdmin}/categories`);
  }
};

module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedBy = {
      updatedAt: new Date(),
    };
    await Categories.updateOne(
      {
        _id: id,
      },
      { ...req.body, $push: { updatedBy: updatedBy } }
    );
    req.flash("success", "Cập nhật thành công!");
  } catch (error) {
    req.flash("error", "Cập nhật thất bại");
    console.log("error edit category: ", error);
  } finally {
    res.redirect(`${systemConfig.prefixAdmin}/categories`);
  }
};

module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await Categories.updateOne(
      { _id: id },
      { deleted: true },
      { deletedAt: new Date() }
    );
    req.flash("success", "Xóa thành công 1 danh mục!");
  } catch (error) {
    req.flash("error", "Xóa thất bại!");
    console.log("error delete category", error);
  } finally {
    res.redirect("back");
  }
};

module.exports.changeMulti = async (req, res) => {
  try {
    const type = req.body.type;
    const ids = req.body.ids.split(",");
    const updatedBy = {
      updatedAt: new Date(),
    };
    switch (type) {
      case "active":
        await Categories.updateMany(
          { _id: { $in: ids } },
          { status: "active", $push: { updatedBy: updatedBy } }
        );
        req.flash(
          "success",
          `Cập nhật thành công trạng thái hoạt động của ${ids.length} danh mục`
        );
        break;
      case "inactive":
        await Categories.updateMany(
          { _id: { $in: ids } },
          { status: "inactive", $push: { updatedBy: updatedBy } }
        );
        req.flash(
          "success",
          `Cập nhật thành công trạng thái dừng hoạt động của ${ids.length} danh mục`
        );
        break;
      case "deleted-all":
        await Categories.updateMany(
          { _id: { $in: ids } },
          {
            deleted: true,
            deletedBy: {
              deletedAt: new Date(),
            },
          }
        );
        req.flash("success", `Đã xóa thành công ${ids.length} danh mục.`);
        break;
      default:
        break;
    }
  } catch (error) {
    req.flash("error", "Chưa thể thực hiện được nhiều thay đổi!");
    console.log("error change multi: ", error);
  } finally {
    res.redirect("back");
  }
};
