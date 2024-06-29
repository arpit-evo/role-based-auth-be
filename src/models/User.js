const mongoose = require("mongoose");
const { ROLES } = require("../utils/enums");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: [ROLES.ADMIN, ROLES.MODERATOR, ROLES.USER],
      default: "user",
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
