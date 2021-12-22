const mongoose = require("mongoose");

const userActivitySchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectID,
      required: true,
      ref: "User",
    },
    user_login_id: {
      type: mongoose.Schema.Types.ObjectID,
      required: true,
      ref: "UserLogin",
    },
    activity: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserActivity = mongoose.model("UserActivity", userActivitySchema);

exports.UserActivity = UserActivity;
