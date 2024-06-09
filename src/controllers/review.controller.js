const Tours = require("../models/tours.model");
const Review = require("../models/review.model");
const Users = require("../models/user.model");
const addReview = async (req, res) => {
  try {
    const { rating, comment, email } = req.body;
    const find = {
      deleted: false,
      slug: req.params.slugTour,
      status: "active",
    };
    const tour = await Tours.findOne(find);
    const user = await Users.findOne({ email });
    const review = new Review({
      tourId: tour.id,
      userId: user.id,
      rating,
      comment,
    });
    await review.save();
    res.json({ code: 200, message: "success", data: review });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addReview,
};
