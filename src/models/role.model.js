const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roleSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    permissions: {
      type: Array,
      default: [],
    },
    status: { type: String, default: "active" },
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

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
