const { model, Schema } = require("mongoose");

const CategorySchema = Schema({
  name: {
    type: String,
    unique: true,
    require: true,
  },
});

module.exports = model("Category", CategorySchema);
