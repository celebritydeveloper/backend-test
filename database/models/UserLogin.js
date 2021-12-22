const mongoose = require("mongoose");

const userLoginSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectID,
    required: true,
    ref: "User",
  },
  ip: {
    type: String,
    required: true,
  },
  browser: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  timestamps: true,
});

const UserLogin = mongoose.model("UserLogin", userLoginSchema);

exports.UserLogin = UserLogin;
