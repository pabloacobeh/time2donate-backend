const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
  const products = await Product.find().populate("userOwner", "name");
  try {
    if (products.length === 0) {
      return res.status(400).json({ message: "No products found" });
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Couldn;t create the product" });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate("userOwner", "name");
  try {
    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Couldn't get the product" });
  }
};

const createProduct = async (req, res) => {
  const productToCreate = await Product.create(req.body);
  try {
    return res.status(201).json(productToCreate);
  } catch (error) {
    return res.status(500).json({ message: "Couldn't create product" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const productToUpdate = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  try {
    return res.status(202).json(productToUpdate);
  } catch (error) {
    return res.status(500).json({ message: "Couldn't update Product" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  try {
    return res.status(203).json({ message: "Product deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Couldn't delete product" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
