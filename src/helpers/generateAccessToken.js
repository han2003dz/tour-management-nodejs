const jwt = require("jsonwebtoken");
const generateAccessToken = (user) => {
  const accessToken = jwt.sign(
    {
      id: user.id,
      admin: user.admin,
    },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: "1d" }
  );
  return accessToken;
};

module.exports = generateAccessToken;
