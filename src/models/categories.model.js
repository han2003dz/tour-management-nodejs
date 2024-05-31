const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

const categorySchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    images: Array,
    status: { type: String, default: "active" },
    slug: {
      type: String,
      slug: "title",
      unique: true,
    },
    deletedBy: {
      account_id: String,
      deletedAt: Date,
    },
    createdBy: {
      account_id: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
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
mongoose.plugin(slug);

const Categories = mongoose.model("Categories", categorySchema, "categories");
module.exports = Categories;
