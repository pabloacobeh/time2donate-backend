const express = require("express");
const router = express.Router();

const {
  getAllCommentsFromProduct,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");

router.get("/product/:id", getAllCommentsFromProduct);
router.post("/comment", createComment);
router.put("/comment/:id", updateComment);
router.delete("/comment/:id", deleteComment);

module.exports = router;
