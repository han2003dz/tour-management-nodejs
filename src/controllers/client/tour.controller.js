const Tours = require("../../models/tours.model");
const Categories = require("../../models/categories.model");
const priceNewHelper = require("../../helpers/priceNew");

// [GET]/tours/:slugCategory
module.exports.category = async (req, res) => {
  const listCategory = await Categories.findOne({
    slug: req.params.slugCategory,
    status: "active",
    deleted: false,
  });
  console.log(listCategory);
  const tours = await Tours.find({
    deleted: false,
  });

  const newTours = priceNewHelper.priceNewTours(tours);
  
  res.redirect("back");
};
