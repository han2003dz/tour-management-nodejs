const mongoose = require("mongoose");
const accountSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    admin: {
      type: Boolean,
      default: false,
    },
    gender: String,
    phone: String,
    avatar: String,
    role_id: String,
    status: { type: String, default: "active" },
    address: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

const Account = mongoose.model("Account", accountSchema, "accounts");

module.exports = Account;
