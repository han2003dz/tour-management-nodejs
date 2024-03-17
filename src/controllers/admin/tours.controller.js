module.exports.index = (req, res) => {
  res.render("admin/pages/tour/index.pug", {
    pageTitle: "Tours",
  });
};