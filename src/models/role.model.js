const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roleSchema = new Schema(
  {
    roleName: {
      type: String,
      trim: true,
      required: true,
    },
    roleIndex: {
      type: String,
      trim: true,
      required: true,
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
