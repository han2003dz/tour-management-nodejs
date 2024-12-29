const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

const tourSchema = new mongoose.Schema(
  {
    title: String,
    code: String,
    tour_category_id: {
      type: String,
      default: "",
    },
    information: String,
    priceAdult: Number,
    priceChild: Number,
    images: Array,
    discountPercentage: Number,
    stock: {
      type: Number,
      required: true,
      min: [0, "Stock must be at least 0"], // Validation for minimum value
    },
    schedule: String,
    featured: String,
    status: { type: String, default: "active" },
    like: {
      type: Number,
      default: 0,
    },
    transport: String,
    numberOfDays: String,
    departureLocation: String,
    timeStart: {
      type: Date,
      default: Date.now,
    },
    bookingCount: number,
    slug: {
      type: String,
      slug: "title",
      unique: true,
    },
    createdBy: {
      account_id: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    deleted: {
      type: Boolean,
      default: false,
      required: true,
    },
    deletedBy: {
      account_id: String,
      deletedAt: Date,
    },
    updatedBy: [
      {
        account_id: String,
        updatedAt: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
);

mongoose.plugin(slug);

const Tours = mongoose.model("Tours", tourSchema, "tours");
module.exports = Tours;
