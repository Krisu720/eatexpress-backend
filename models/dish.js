const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema(
  {
    name: String,
    img: String,
    price: Number,
    options: {
      sizes: [
        {
          name: String,
          price: Number,
        }
      ]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("dish", dishSchema);
