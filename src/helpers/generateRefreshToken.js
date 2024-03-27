const jwt = require("jsonwebtoken");
const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign(
    {
      id: user.id,
      admin: user.admin,
    },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: "365d" }
  );
  return refreshToken;
};
module.exports = generateRefreshToken;

