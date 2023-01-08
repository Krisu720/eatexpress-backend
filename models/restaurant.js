const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name: String,
    img: String,
    deliveryTime: String,
    deliveryCost: Number,
    rating: Number,
    products: { type: mongoose.SchemaTypes.Array, ref: "section" },
  },
  { timestamps:true }
);

module.exports = mongoose.model("restaurant", restaurantSchema);
