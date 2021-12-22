const mongoose = require("mongoose");

const adminActivitySchema = new mongoose.Schema(
  {
    admin_id: {
      type: mongoose.Schema.Types.ObjectID,
      required: true,
      ref: "User",
    },
    admin_login_id: {
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

const AdminActivity = mongoose.model("AdminActivity", adminActivitySchema);

exports.AdminActivity = AdminActivity;
