// const Users = require("../../models/users.model");

// module.exports.requireAuth = async (req, res, next) => {
//   try {
//     const token = req.cookies.tokenUser;
//     if (!token) {
//       throw new Error("Không tìm thấy token");
//     }
//     const user = await Users.findOne({ tokenUser: token }).select("-password");
//     if (!user) {
//       throw new Error("Người dùng không tồn tại");
//     }
//     res.locals.user = user;
//     next();
//   } catch (error) {
//     res.redirect("/auth/login");
//   }
// };

const jwt = require("jsonwebtoken");
const authMiddleware = {
  // verifyToken: Xác nhận token
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      console.log(accessToken);
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          res.status(403).json("Token is not valid");
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json("You're not authenticated");
    }
  },

  verifyTokenAndAdminAuth: (req, res, next) => {
    authMiddleware.verifyToken(req, res, () => {
      if (req.user.id == req.params.id || req.user.admin) {
        next();
      } else {
        res.status(403).json("You do not have access");
      }
    });
  },
};
module.exports = authMiddleware;
