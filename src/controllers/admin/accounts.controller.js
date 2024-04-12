// const bcrypt = require("bcrypt");
// const Accounts = require("../../models/accounts.model");
// const Roles = require("../../models/roles.model");
// const systemConfig = require("../../config/system");
// const filterStatusHelper = require("../../helpers/filterStatus");
// const searchHelper = require("../../helpers/search");
// // [GET] /admin/accounts
// module.exports.index = async (req, res) => {
//   const filterStatus = filterStatusHelper(req.query);
//   const objectSearch = searchHelper(req.query);
//   const find = {
//     deleted: false,
//     ...(req.query.status && { status: req.query.status }),
//     ...(objectSearch.regex && { title: objectSearch.regex }),
//   };
//   const users = await Accounts.find(find).select("-password");
//   console.log(users);
//   res.render("admin/pages/account/index", {
//     pageTitle: "Danh sách tài khoản",
//     users,
//     filterStatus,
//     keyword: objectSearch.keyword,
//   });
// };

// // [GET] /admin/accounts/create
// module.exports.create = async (req, res) => {
//   const roles = await Roles.find({
//     deleted: false,
//   });

//   res.render("admin/pages/account/create", {
//     pageTitle: "Tạo mới tài khoản",
//     roles: roles,
//   });
// };
// // [POST] /admin/accounts/create
// module.exports.createPost = async (req, res) => {
//   try {
//     const emailExist = await Accounts.findOne({
//       email: req.body.email,
//       deleted: false,
//     });

//     if (emailExist) {
//       req.flash("error", `Email ${req.body.email} đã tồn tại`);
//       res.redirect("back");
//     } else {
//       const salt = await bcrypt.genSalt(10);
//       const hashed = await bcrypt.hash(req.body.password, salt);
//       req.body.password = hashed;
//       const user = new Accounts(req.body);
//       await user.save();
//       req.flash("success", "Thêm tài khoản thành công");
//       res.redirect(`${systemConfig.prefixAdmin}/accounts`);
//     }
//   } catch (error) {
//     console.log(error);
//     req.flash("success", "Thêm tài khoản thất bại");
//     res.redirect(`${systemConfig.prefixAdmin}/accounts`);
//   }
// };
