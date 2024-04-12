const Tours = require("../../models/tours.model");
const priceNewHelper = require("../../helpers/priceNew");
const Categories = require("../../models/categories.model");
module.exports.home = async (req, res) => {
  try {
    const [toursFeatured, toursNew] = await Promise.all([
      Tours.find({ featured: "1", deleted: false, status: "active" }).limit(6),
      Tours.find({ deleted: false, status: "active" }),
    ]);
    const [newToursFeatured, tours] = await Promise.all([
      priceNewHelper.priceNewTours(toursFeatured),
      priceNewHelper.priceNewTours(toursNew),
    ]);
    console.log(req.user)
    res.render("client/pages/home/index", {
      pageTitle: "Trang chủ",
      newToursFeatured,
      tours,
      user: req.user
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Đã xảy ra lỗi khi tải trang chủ");
  }
};
