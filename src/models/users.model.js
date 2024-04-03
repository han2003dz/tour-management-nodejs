const mongoose = require("mongoose");
const generate = require("../helpers/generate");

const userSchema = new mongoose.Schema(
  {
    userName: String,
    email: String,
    password: String,
    // tokenUser: {
    //   type: String,
    //   default: generate.generateRandomString(20),
    // },
    phone: String,
    avatar: String,
    role_id: String,
    address: String,
    status: {
      type: String,
      default: "active",
    },
    admin: {
      type: Boolean,
      default: false,
    },
    statusOnline: String,
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

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
