const { model, Schema } = require("mongoose");

const ProductSchema = Schema({
  title: {
    type: String,
    require: true,
    trim: true,
  },
  userOwner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    trim: true,
  },
  image1: {
    type: String,
  },
  image2: {
    type: String,
  },
  image3: {
    type: String,
  },
  image4: {
    type: String,
  },
});

module.exports = model("Product", ProductSchema);
