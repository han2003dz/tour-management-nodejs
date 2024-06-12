const Tours = require("../models/tours.model");
const Review = require("../models/review.model");
const Users = require("../models/user.model");
const addReview = async (req, res) => {
  try {
    const { rating, comment, userId } = req.body;
    console.log(res.locals.user);
    const find = {
      deleted: false,
      slug: req.params.slugTour,
      status: "active",
    };

    const [tour, user] = await Promise.all([
      Tours.findOne(find),
      Users.findOne({ _id: userId }).select("avatar username"),
    ]);
    console.log(user);
    if (!tour) {
      return res.status(404).json({ code: 404, message: "Tour not found" });
    }
    if (!user) {
      return res.status(404).json({ code: 404, message: "User not found" });
    }
    const review = new Review({
      tourId: tour.id,
      infoUser: { userId, username: user.username, avatar: user.avatar },
      rating,
      comment,
    });
    await review.save();
    res.json({ code: 200, message: "success", data: review });
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: "Internal server error" });
  }
};

module.exports = {
  addReview,
};
