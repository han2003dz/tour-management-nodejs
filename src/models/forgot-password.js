const mongoose = require("mongoose");

const forgotPasswordSchema = new mongoose.Schema(
  {
    email: String,
    otp: String,
    expireAt: {
      type: Date,
      expire: 180,
    },
  },
  {
    timestamps: true,
  }
);

const ForgotPassword = mongoose.model("ForgotPassword", forgotPasswordSchema);

module.exports = ForgotPassword;
