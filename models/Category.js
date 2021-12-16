const { model, Schema } = require("mongoose");

const CategorySchema = Schema({
  name: {
    type: String,
  },
});

module.exports = model("Category", CategorySchema);
