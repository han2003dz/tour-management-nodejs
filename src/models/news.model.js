const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
const NewSchema = new mongoose.Schema(
  {
    title: String,
    image: String,
    status: {
      type: String,
      default: "active",
    },
    content: String,
    slug: {
      type: String,
      slug: "title",
      unique: true,
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
mongoose.plugin(slug);
const News = mongoose.model("News", NewSchema, "news");
module.exports = News;
