const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

const categorySchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: String,
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
          default: Date.now,
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
