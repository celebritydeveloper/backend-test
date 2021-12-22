const mongoose = require("mongoose");


const connection = mongoose.connect("mongodb://localhost:27017/shopping-cart", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log("Connect Successful"))
  .catch((err) => console.error("Could not connect" + err));



module.exports = connection