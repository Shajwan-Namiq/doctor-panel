const Product = require("../model/productModel");

//Create product
exports.createProduct = async (req, res) => {
  const {
    name,
    color,
    category,
    subCategory,
    price,
    brand,
    description,
    inStock,
    quantity,
    images,
  } = req.body;
  try {
    const product = await Product.create({
      name,
      color,
      category,
      subCategory,
      price,
      brand,
      description,
      inStock,
      quantity,
      images,
    });

    await product.populate("category");
    product.category.products.push(product);
    await product.category.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//Search products
exports.searchProducts = async (req, res) => {
const { query } = req.params.query;


  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { subCategory: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//Get singleProduct
exports.getProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  const {
    name,
    color,
    category,
    subCategory,
    price,
    brand,
    description,
    inStock,
    quantity,
    images,
  } = req.body;
  const { productId } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        color,
        category,
        subCategory,
        price,
        brand,
        description,
        inStock,
        quantity,
        images,
      },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//Delete product
exports.deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
