const Categories = require("../models/categories.model");
const systemConfig = require("../config/system");

const createPost = async (req, res) => {
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

const editPatch = async (req, res) => {
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

const deleteRecord = async (req, res) => {
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

const changeMulti = async (req, res) => {
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

const changeStatus = async (req, res) => {
  try {
    const { status, id } = req.params;
    await Categories.updateOne({ _id: id }, { status: status });
    req.flash("success", "Cập nhật trạng thái thành công!");
  } catch (error) {
    console.log(error);
    req.flash("error", "Thay đổi trang thái cho danh mục thất bại!");
  } finally {
    res.redirect("back");
  }
};

module.exports = {
  createPost,
  editPatch,
  deleteRecord,
  changeStatus,
  changeMulti,
};
