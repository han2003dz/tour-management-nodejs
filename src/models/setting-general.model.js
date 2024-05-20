const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    websiteName: {
      type: String,
      required: true,
      trim: true,
    },
    logo: String,
    phone: String,
    email: String,
    address: String,
    copyright: String,
    policy: String,
  },
  {
    timestamps: true,
  }
);

const Setting = mongoose.model("Setting", settingSchema);

module.exports = Setting;
