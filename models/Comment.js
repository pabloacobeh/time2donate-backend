const { model, Schema } = require("mongoose");

const CommentSchema = Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  date: {
    type: Date,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

module.exports = model("Comment", CommentSchema);
