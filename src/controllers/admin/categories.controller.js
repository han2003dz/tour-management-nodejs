module.exports.index = (req, res) => {
  res.render("admin/pages/category/index.pug", {
    pageTitle: "Danh mục tour",
  });
};