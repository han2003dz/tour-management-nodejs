const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    permissions: {
      type: Array,
      default: [],
    },
    status: String,
    slug: {
      type: String,
      slug: "title",
      unique: true,
    },
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
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const Role = mongoose.model("Role", roleSchema, "roles");
module.exports = Role;
