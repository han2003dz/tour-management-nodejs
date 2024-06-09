const Tours = require("../models/tours.model");
const systemConfig = require("../config/system");
const { generateTourCode } = require("../helpers/generateCode");

const createPost = async (req, res) => {
  try {
    const countTour = await Tours.countDocuments();
    const code = generateTourCode(countTour + 1);
    const { price, discountPercentage, stock } = req.body;
    const tourData = {
      ...req.body,
      code,
      price: parseInt(price),
      discountPercentage: parseInt(discountPercentage),
      stock: parseInt(stock),
    };
    const tour = new Tours(tourData);
    await tour.save();
    req.flash("success", "Thêm thành công tour mới!");
  } catch (error) {
    console.log("error: ", error);
    req.flash("error", "Không thêm được tour mới!");
  }
  res.redirect(`${systemConfig.prefixAdmin}/tours/create`);
};

const editPatch = async (req, res) => {
  try {
    req.body.priceAdult = parseInt(req.body.priceAdult);
    req.body.priceChild = parseInt(req.body.priceChild);
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

const deleteRecord = async (req, res) => {
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

const changeStatus = async (req, res) => {
  try {
    const { status, id } = req.params;
    await Tours.updateOne({ _id: id }, { status: status });
    req.flash("success", "Cập nhật trạng thái thành công!");
  } catch (error) {
    console.log(error);
    req.flash("error", "Thay đổi trang thái thất bại!");
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
        await Tours.updateMany(
          { _id: { $in: ids } },
          { status: "active", $push: { updatedBy: updatedBy } }
        );
        req.flash(
          "success",
          `Cập nhật thành công trạng thái hoạt động của ${ids.length} tour`
        );
        break;
      case "inactive":
        await Tours.updateMany(
          { _id: { $in: ids } },
          { status: "inactive", $push: { updatedBy: updatedBy } }
        );
        req.flash(
          "success",
          `Cập nhật thành công trạng thái dừng hoạt động của ${ids.length} tour`
        );
        break;
      case "deleted-all":
        await Tours.updateMany(
          { _id: { $in: ids } },
          {
            deleted: true,
            deletedBy: {
              deletedAt: new Date(),
            },
          }
        );
        req.flash("success", `Đã xóa thành công ${ids.length} tour`);
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

const like = async (req, res) => {
  try {
    const id = req.params.idTour;
    const typeLike = req.params.typeLike;
    const tour = await Tours.findOne({
      _id: id,
      status: "active",
      deleted: false,
    });

    const newLike = typeLike == "like" ? tour.like + 1 : tour.like - 1;
    await Tours.updateOne(
      {
        _id: id,
      },
      {
        like: newLike,
      }
    );
    res.json({
      code: 200,
      message: "Thành công!",
      like: newLike,
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Thất bại!",
    });
    console.log(error);
  }
};

module.exports = {
  createPost,
  editPatch,
  deleteRecord,
  changeStatus,
  changeMulti,
  like,
};
