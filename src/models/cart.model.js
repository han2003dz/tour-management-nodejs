const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema(
  {
    user_id: String,
    tours: [
      {
        tour_id: String,
        quantityAdult: Number,
        quantityChild: Number,
        expectedDate: Date,
        bookingDate: Date,
      },
    ],
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
    updatedBy: [
      {
        account_id: String,
        updatedAt: {
          type: Date,
          default: Date,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Cart = mongoose.model("Cart", cartSchema, "cart");
module.exports = Cart;
