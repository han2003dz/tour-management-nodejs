const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const checkCookieMiddleware = async (req, res, next) => {
  try {
    let accessToken = req.signedCookies?.tokens;
    if (!accessToken) {
      return next();
    }
    console.log("accessToken", accessToken);
    let payload = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    console.log("payload", payload);
    const { userId } = payload;
    const user = await User.findOne({ _id: userId });
    if (!user || user.deleted === true) {
      return next();
    }
    user.lastLogin = Date.now();
    await user.save();
    req.user = user;
    res.locals.user = user;
    next();
  } catch (err) {
    console.log("err checkCookie", err);
    next();
  }
};
module.exports = {
  checkCookieMiddleware,
};
