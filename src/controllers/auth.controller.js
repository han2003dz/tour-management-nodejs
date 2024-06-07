const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const { User, Role } = require("../models");
const Cart = require("../models/cart.model");
const pick = require("../utils/pick");
const response = require("../utils/response");

const register = catchAsync(async (req, res) => {
  const { confirm, ...remainingData } = req.body;

  let dataCreate = pick(remainingData, ["username", "email", "password"]);

  if (dataCreate.password !== confirm) {
    throw new ApiError(400, "Xác nhận mật khẩu không trùng khớp!");
  }

  const isUserExists = await User.exists({ email: dataCreate.email });
  if (isUserExists) {
    throw new ApiError(400, "Email đã tồn tại");
  }

  const role = await Role.findOne({ roleIndex: "user" });

  const user = await User.create({ ...dataCreate, roles: [role._id] });
  const cart = new Cart({ user_id: user._id });
  await cart.save();

  res.status(201).json(response(201, "Thành công", user));
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(400, "Email hoặc mật khẩu nhập sai");
  }
  if (user.isLocked === true) {
    next(new ApiError(401, "Tài khoản đã bị khoá"));
  }

  const isPassword = await bcrypt.compare(password, user.password);
  if (!isPassword) {
    throw new ApiError(400, "Email hoặc mật khẩu nhập sai");
  }
  const cart = await Cart.findOne({
    user_id: user.id,
  });

  if (cart) {
    res.cookie("cartTourId", cart.id);
  } else {
    await Cart.updateOne(
      {
        _id: req.cookies.cartTourId,
      },
      {
        user_id: user.id,
      }
    );
  }

  const accessToken = jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  res.cookie("tokens", accessToken, { signed: true, httpOnly: true });

  res.status(200).json(response(200, "Thành công", accessToken));
});

const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (user.role_id !== null) {
      if (!user) {
        throw new ApiError(400, "Email chưa được đăng ký!");
      }
      if (user.isLocked === true) {
        next(new ApiError(401, "Tài khoản đã bị khoá"));
      }
      const isPassword = await bcrypt.compare(password, user.password);

      if (!isPassword) {
        throw new ApiError(400, "Sai mật khẩu!");
      }
      const accessToken = jwt.sign(
        {
          userId: user.id,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: process.env.JWT_EXPIRES_IN,
        }
      );
      res.cookie("tokens", accessToken, { signed: true, httpOnly: true });
      res.status(200).json(response(200, "Thành công", accessToken));
    } else {
      res.status(400).json({ code: 400, message: "Thất bại" });
      res.redirect("back");
    }
  } catch (error) {
    req.flash("error", "Bạn không có quyền truy cập hệ thống!");
    res.redirect("back");
    console.log(error);
  }
};

const logout = catchAsync(async (req, res, next) => {
  if (!req.signedCookies["tokens"]) {
    return res.status(400).json(response(400, "Thất bại"));
  }

  res.clearCookie("tokens");
  res.clearCookie("cartTourId");
  res.redirect("/login");
});

const logoutAdmin = catchAsync(async (req, res, next) => {
  if (!req.signedCookies["tokens"]) {
    return res.status(400).json(response(400, "Thất bại"));
  }
  res.clearCookie("tokens");
  res.status(200).json(response(200, "Thành công"));
});
module.exports = {
  register,
  login,
  logout,
  loginAdmin,
  logoutAdmin,
};
