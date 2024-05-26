const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
const ContactSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    notes: { type: String, required: true },
    createdBy: {
      user_id: String,
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
      user_id: String,
      deletedAt: Date,
    },
    updatedBy: [
      {
        user_id: String,
        updatedAt: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
);
mongoose.plugin(slug);
const Contact = mongoose.model("Contact", ContactSchema);
module.exports = Contact;
