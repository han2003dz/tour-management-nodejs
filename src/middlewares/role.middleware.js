module.exports.roleMiddleware = (allRoles) => (req, res, next) => {
  const check = allRoles.every((role) => req.roles.includes(role));
  if (!check) {
    return res.redirect("/permission-denied");
  }
  next();
};
