const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema(
  {
    code: String,
    tours: [
      {
        tourId: String,
        price: Number,
        discountPercentage: Number,
        quantity: Number,
      },
    ],
    userInfo: {
      username: String,
      phone: String,
      address: String,
    },
    note: String,
    status: String,
    timeStart: {
      type: Date,
      default: Date.now,
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
const Booking = mongoose.model("Booking", tourSchema, "booking");
module.exports = Booking;
