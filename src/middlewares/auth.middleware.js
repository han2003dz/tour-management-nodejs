const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { User, Role } = require("../models");
const systemConfig = require("../config/system");
module.exports.authMiddleware = catchAsync(async (req, res, next) => {
  // Lấy accessToken từ signedCookies
  let accessToken = req.signedCookies?.tokens;
  if (!accessToken) {
    res.redirect(`${systemConfig.prefixAdmin}/login`);
  }
  try {
    // Xác thực token
    const payload = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    const { userId } = payload;
    // Tìm người dùng theo userId
    const user = await User.findById(userId).populate("role_id");
    if (!user) {
      res.redirect(`${systemConfig.prefixAdmin}/login`);
    }
    // Kiểm tra nếu tài khoản bị khóa
    if (user.isLocked) {
      return next(new ApiError(401, "Tài khoản đã bị khoá"));
    }
    // Lấy quyền của người dùng
    const roles = await Role.findById(user.role_id);
    // Khởi tạo req.locals nếu chưa tồn tại
    req.locals = req.locals || {};
    req.locals.user = user;
    req.locals.roles = roles;
    next();
  } catch (error) {
    res.redirect("admin/login");
  }
});
