const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
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
    password: {
      type: String,
      required: false,
      minlength: 8,
      maxlength: 255,
    },
    phone: {
      type: String,
      required: true,
      minlength: 11,
      maxlength: 20,
    },
    password_reset_token: {
      type: String,
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
    phone_verified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: Number,
      required: false,
    },
    token_expiry: {
      type: String,
      required: false,
    },
    user_type: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

exports.Admin = Admin;