const express = require("express");
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const router = express.Router();

router.get("/", getAllCategories);
router.get("/category/:id", getCategoryById);
router.post("/category", createCategory);
router.put("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);

module.exports = router;
