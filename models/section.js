const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema(
  {
    name: String,
    dishes: { type: mongoose.SchemaTypes.Array, ref: "dish" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("section", sectionSchema);
