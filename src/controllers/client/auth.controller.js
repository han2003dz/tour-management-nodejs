// [GET] /user/login
const login = async (req, res) => {
  res.render("client/pages/auth/login", {
    pageTitle: "Đăng nhập tài khoản",
  });
};

module.exports = {
  login,
};
