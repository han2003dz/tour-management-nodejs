const Roles = require("../../models/roles.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const systemConfig = require("../../config/system");

const index = async (req, res) => {
  try {
    const filterStatus = filterStatusHelper(req.query);
    const objectSearch = searchHelper(req.query);
    const find = {
      deleted: false,
      ...(req.query.status && { status: req.query.status }),
      ...(objectSearch.regex && { title: objectSearch.regex }),
    };
    const roles = await Roles.find(find);

    res.render("admin/pages/role/index.pug", {
      pageTile: "Danh sách quyền",
      roles,
      filterStatus,
      keyword: objectSearch.keyword,
    });
  } catch (error) {
    console.log("error: ", error);
    req.flash("error", "Không có quyền truy cập!");
  }
};

const create = async (req, res) => {
  try {
    res.render("admin/pages/role/create", {
      pageTitle: "Thêm quyền",
    });
  } catch (error) {
    req.flash("error", "Không có quyền truy cập!");
    console.log("error: ", error);
  }
};
const createPost = async (req, res) => {
  try {
    const role = new Roles(req.body);
    console.log(req.body);
    await role.save();
    req.flash("success", "Thêm thành công");
  } catch (error) {
    req.flash("error", "Thêm quyền thất bại!");
    console.log("error create role: ", error);
  } finally {
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  }
};

const detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };
    const role = await Roles.findOne(find);
    res.render("admin/pages/role/detail.pug", {
      pageTitle: role.title,
      role,
    });
  } catch (error) {
    console.log("error detail categories controller", error);
  }
};

module.exports = {
  index,
  create,
  createPost,
  detail,
};
