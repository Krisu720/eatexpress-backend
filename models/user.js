const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    surname: String,
    email: String,
    password: String,
    role: {type:String,default: "user"},
    img: String,
    address: {
        favourite: {
            name: String,
            street: String,
            city: String,
            number: String,
        },
        other: [
            {
                name: String,
                street: String,
                city: String,
                number: String,
            }
        ]
    },
    phone: String,
    orders: { type: mongoose.SchemaTypes.Array, ref: "order" },
  },
  { timestamps:true }
);

module.exports = mongoose.model("user", userSchema);
