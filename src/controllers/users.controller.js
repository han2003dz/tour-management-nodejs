const bcrypt = require("bcrypt");
const Users = require("../models/user.model");
const Roles = require("../models/role.model");
const systemConfig = require("../config/system");

const createPost = async (req, res) => {
  try {
    const emailExist = await Users.findOne({
      email: req.body.email,
      deleted: false,
    });

    if (emailExist) {
      req.flash("error", `Email ${req.body.email} đã tồn tại`);
      res.redirect("back");
    } else {
      const user = new Users(req.body);
      await user.save();
      req.flash("success", "Thêm tài khoản thành công");
      res.redirect(`${systemConfig.prefixAdmin}/users`);
    }
  } catch (error) {
    console.log(error);
    req.flash("success", "Thêm tài khoản thất bại");
    res.redirect(`${systemConfig.prefixAdmin}/users`);
  }
};

const editPatch = async (req, res) => {
  try {
    const id = req.params.id;
    const emailExist = await Users.findOne({
      _id: { $ne: id },
      email: req.body.email,
      isLocked: false,
    });
    if (emailExist) {
      req.flash("error", "Email đã tồn tại!");
    } else {
      if (req.body.password) {
        req.body.password = md5(req.body.password);
      } else {
        delete req.body.password;
      }
    }
    await Users.updateOne({ _id: id }, req.body);
    req.flash("success", "Cập nhât thông tin cá nhân thành công!");
  } catch (error) {
    console.log(error);
    req.flash("error", "Cập nhât thông tin cá nhân thất bại!");
  } finally {
    res.redirect("back");
  }
};
module.exports = {
  createPost,
  editPatch,
};
