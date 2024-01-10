const Category = require("../model/categoryModel");

//Create category
exports.createCategory = async (req, res) => {
  const { name, category, icon, img } = req.body;
  try {
    const savedCategory = await Category.create({
      name,
      category,
      icon,
      img,
    });
    res.status(201).json(savedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//Get All category
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("products");
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//Get singleCategory
exports.getCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  const { name, category, icon, img, products } = req.body;
  const { categoryId } = req.params;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      {
        name,
        category,
        icon,
        img,
        products,
      },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};




//Delete category
exports.deleteCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
