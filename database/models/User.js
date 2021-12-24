const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    lastname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      minlength: 11,
      maxlength: 20,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

exports.User = User;
