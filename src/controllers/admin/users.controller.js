const bcrypt = require("bcrypt");
const Users = require("../../models/user.model");
const Roles = require("../../models/role.model");
const systemConfig = require("../../config/system");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");

const index = async (req, res) => {
  const filterStatus = filterStatusHelper(req.query);
  const objectSearch = searchHelper(req.query);
  const find = {
    deleted: false,
    ...(req.query.status && { status: req.query.status }),
    ...(objectSearch.regex && { title: objectSearch.regex }),
  };
  const users = await Users.find(find).select("-password");

  res.render("admin/pages/account/index", {
    pageTitle: "Danh sách tài khoản",
    users,
    filterStatus,
    keyword: objectSearch.keyword,
  });
};

const create = async (req, res) => {
  const roles = await Roles.find({
    deleted: false,
  });

  res.render("admin/pages/account/create", {
    pageTitle: "Tạo mới tài khoản",
    roles: roles,
  });
};

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
  index,
  create,
  createPost,
};
