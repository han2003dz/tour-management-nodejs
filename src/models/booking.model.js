const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema(
  {
    code: String,
    cart_id: String,
    tourInfo: {
      title: String,
      tourId: String,
      amountPaid: Number,
      discountPercentage: Number,
      quantityAdult: Number,
      quantityChild: Number,
      price: Number,
      expectedDate: Date,
      image: String,
      numberOfDays: String,
    },
    userInfo: {
      username: String,
      phone: String,
      address: String,
      note: String,
    },
    note: String,
    transactionType: String,
    status: { type: String },
    statusTrip: { type: String, default: "Chưa tới ngày đi" },
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
const Booking = mongoose.model("Booking", bookingSchema, "booking");
module.exports = Booking;
