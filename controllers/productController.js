const Product = require("../models/Product");
const cloudinary = require("cloudinary").v2;

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
  const product = await Product.findById(id)
    .populate("userOwner", "name")
    .populate("category");
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

const uploadImage = async (req, res) => {
  const { id } = req.params;
  const productToUpdate = await Product.findById(id);
  if (productToUpdate.image1) {
    let array = productToUpdate.image1.split("/");
    let fileName = array[array.length - 1];
    const [public_id] = fileName.split(".");
    await cloudinary.uploader.destroy(public_id);
  }
  const { temFilePath } = req.files.image1;
  const { secure_url } = await cloudinary.uploader.upload(temFilePath);
  productToUpdate.image1 = secure_url;
  await productToUpdate.save();
  try {
    return res.status(201).json(productToUpdate);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "There was an error with the image" });
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
  uploadImage,
  updateProduct,
  deleteProduct,
};
