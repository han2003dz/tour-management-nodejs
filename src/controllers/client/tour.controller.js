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
    res.render("client/pages/tours/index", {
      pageTitle: "Danh sách tours",
      tours: newTours,
    });
  } catch (error) {
    console.log(error);
  }
};

const detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      slug: req.params.slugTour,
      status: "active",
    };
    const tour = await Tours.findOne(find);
    if (tour.tour_category_id) {
      const category = await Categories.findOne({
        _id: tour.tour_category_id,
        status: "active",
        deleted: false,
      });
      tour.category = category;
    }
    tour.priceNew = priceNewHelper.priceNewTour(tour);
    res.render("client/pages/tours/detail", {
      pageTitle: tour.title,
      tour,
    });
  } catch (error) {
    res.redirect(`/`);
    console.log(error);
  }
};
const category = async (req, res) => {
  try {
    const category = await Categories.findOne({
      slug: req.params.slugCategory,
      status: "active",
      deleted: false,
    });
    const tours = await Tours.find({
      tour_category_id: category.id,
      deleted: false,
    });
    const newTours = priceNewHelper.priceNewTours(tours);
    res.render("client/pages/tours/index", {
      pageTitle: category.title,
      tours: newTours,
    });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
module.exports = {
  index,
  detail,
  category,
};
