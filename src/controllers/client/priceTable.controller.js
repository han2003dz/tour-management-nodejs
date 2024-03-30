const Tours = require("../../models/tours.model");
const Categories = require("../../models/categories.model");
const priceNewHelper = require("../../helpers/priceNew");
const sortHelper = require("../../helpers/sort");
const index = async (req, res) => {
  try {
    let sort = {};
    sortHelper.addToSort(req, sort);
    const tours = await Tours.find({
      status: "active",
      deleted: false,
    }).sort(sort);
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
