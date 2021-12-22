const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectID,
      required: true,
      ref: "User",
    },
    items: [
      {
        item_id: { type: mongoose.Schema.Types.ObjectID, ref: "Product" },
        itemname: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number },
      },
    ],
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

exports.Cart = Cart;
