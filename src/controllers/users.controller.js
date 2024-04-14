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
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashed;
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

module.exports = {
  createPost,
};
