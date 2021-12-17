const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require("../controllers/productController");

router.get("/", getAllProducts);
router.get("/product/:id", getProductById);
router.post("/product", createProduct);
router.post("/product/imageUpload/:id", uploadImage);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

module.exports = router;
