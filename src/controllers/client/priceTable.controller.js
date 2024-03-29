const Tours = require("../../models/tours.model");
const Categories = require("../../models/categories.model");
const priceNewHelper = require("../../helpers/priceNew");

const index = async (req, res) => {
  try {
    const tours = await Tours.find({
      status: "active",
      deleted: false,
    });
    const newTours = priceNewHelper.priceNewTours(tours);
    res.render("client/pages/priceTable/index", {
      pageTitle: "Bảng giá tours",
      tours: newTours,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  index,
};
