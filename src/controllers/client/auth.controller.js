const Users = require("../../models/users.model");
const bcrypt = require("bcrypt");
const generateAccessToken = require("../../helpers/generateAccessToken");
const generateRefreshToken = require("../../helpers/generateRefreshToken");
const jwt = require("jsonwebtoken");
let refreshTokens = [];
const login = async (req, res) => {
  try {
    res.render("client/pages/auth/login", {
      pageTitle: "Đăng nhập",
    });
  } catch (error) {
    console.log(error);
  }
};

const loginPost = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email, deleted: false });
    if (!user) {
      req.flash("error", "Email không tồn tại!");
      res.redirect("back");
      return;
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      // req.flash("error", "Sai mật khẩu vui lòng nhập lại!");
      res.status(404).json("Wrong password");
      // res.redirect("back");
      return;
    }
    if (user.status == "inactive") {
      req.flash("error", "Tài khoản đã bị khóa!");
      res.redirect("back");
      return;
    }
    if (user && validPassword && user.status == "active") {
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      refreshTokens.push(refreshToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      const { password, ...others } = user._doc;
      res.status(200).json({ ...others, accessToken });
    } else {
      res.status(400);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
const requestRefreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json("You're not authenticated");
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("refresh token is not valid");
  }
  jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, user) => {
    if (err) {
      console.log(err);
    }
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    refreshTokens.push(newRefreshToken);
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    res.status(200).json({ accessToken: newAccessToken });
  });
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
      // res.cookie("tokenUser", user.tokenUser);
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
  loginPost,
  requestRefreshToken,
};
