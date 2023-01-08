const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: "user" },
    products: [
        {
            productId: { type: mongoose.SchemaTypes.ObjectId, ref: "dish" },
            quantity: Number,
        }
    ],
    status: {type:String,default: "pending"},
    address: {
        name: String,
        street: String,
        city: String,
        number: String,
    },
    method: String,
  },
  { timestamps:true }
);

module.exports = mongoose.model("order", orderSchema);
