const Users = require("../../models/users.model");

module.exports.requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies.tokenUser;
    if (!token) {
      throw new Error("Không tìm thấy token");
    }
    const user = await Users.findOne({ tokenUser: token }).select("-password");
    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }
    res.locals.user = user;
    next();
  } catch (error) {
    res.redirect("/users/login");
  }
};
