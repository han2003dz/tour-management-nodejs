const Accounts = require("../../models/accounts.model");
const bcrypt = require("bcrypt");
const generateAccessToken = require("../../helpers/generateAccessToken");
const generateRefreshToken = require("../../helpers/generateRefreshToken");
const jwt = require("jsonwebtoken");
let refreshTokens = [];
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Accounts.findOne({ email });
    if (!user) {
      req.flash("error", "Email không tồn tại!");
      res.redirect("back");
      return;
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      req.flash("error", "Sai mật khẩu!");
      res.redirect("back");
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
        sameSite: "Strict",
      });
      const { password, ...others } = user._doc;
      res.status(200).json({ ...others }, accessToken);
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
      sameSite: "Strict",
    });
    res.status(200).json({ accessToken: newAccessToken });
  });
};
const logout = async (req, res) => {
  res.clearCookie("refreshToken");
  refreshTokens = refreshTokens.filter(
    (token) => token !== req.cookies.refreshToken
  );
  res.status(200).json("logged out successfully!");
};
module.exports = {
  login,
  logout,
  requestRefreshToken,
};
