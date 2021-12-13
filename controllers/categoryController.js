const Category = require("../models/Category");

const getAllCategories = async (req, res) => {
  const categories = await Category.find();
  if (categories.length === 0) {
    return res.status(400).json({ messasge: "No categories yet" });
  }
  try {
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: "Couldn't retrieve categories" });
  }
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  try {
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ message: "Couldn't retrive the category" });
  }
};

const createCategory = async (req, res) => {
  const categoryToCreate = await Category.create(req.body);
  try {
    return res.status(201).json(categoryToCreate);
  } catch (error) {
    return res.status(500).json({ message: "Couldn't create the category" });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const categoryToUpdate = await Category.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  try {
    return res.status(202).json(categoryToUpdate);
  } catch (error) {
    return res.status(500).json({ message: "Couln't update the Category" });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  await Category.findByIdAndDelete(id);
  try {
    return res.status(203).json({ message: "Category deleted" });
  } catch (error) {
    return res.statusS(500).json({ message: "Couldn't delete the category" });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
