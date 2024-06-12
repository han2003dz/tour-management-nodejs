const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  tourId: { type: Schema.Types.ObjectId, ref: "Tours", required: true },
  infoUser: {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    username: String,
    avatar: String,
  },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
  deleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: Date,
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
