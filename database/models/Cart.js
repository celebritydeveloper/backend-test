const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectID,
    required: true,
    ref: "User"
  },
  items: [{
    item: {type: mongoose.Schema.Types.ObjectID, ref: "Product"},
    qty: {type: Number},
    price: {type: Number}
  }],
  total: {type: Number},
  timestamps: true
});

const Cart = mongoose.model("Cart", cartSchema);


exports.Cart = Cart;
