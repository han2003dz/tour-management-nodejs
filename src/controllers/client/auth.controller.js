const Users = require("../../models/users.model");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    res.render("client/pages/auth/login", {
      pageTitle: "Đăng nhập",
    });
  } catch (error) {
    console.log(error);
  }
};
const register = async (req, res) => {
  try {
    res.render("client/pages/auth/register", {
      pageTitle: "Đăng ký",
    });
  } catch (error) {
    console.log(error);
  }
};

const registerPost = async (req, res) => {
  try {
    const existEmail = await Users.findOne({
      email: req.body.email,
    });
    if (existEmail) {
      req.flash("error", "email đã tồn tại!");
      res.redirect("back");
      return;
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashed;
      const user = new Users(req.body);
      await user.save();
      req.flash("success", "Đăng ký thành công");
      res.cookie("tokenUser", user.tokenUser);
      res.redirect("/");
    }
  } catch (error) {
    req.flash("error", "Đăng ký thất bại!");
    res.redirect("back");
    return;
  }
};
module.exports = {
  login,
  register,
  registerPost,
};
