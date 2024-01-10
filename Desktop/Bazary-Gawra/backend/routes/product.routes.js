const express = require("express");
const router = express.Router();
const productController = require("../controller/product.controller");

// Create a new product
router.post("/", productController.createProduct);

// Get All product
router.get("/", productController.getAllProducts);

// Search for products
router.get("/search/:query", productController.searchProducts);


// Get a single product
router.get("/:productId", productController.getProduct);

// Update a product
router.put("/:productId", productController.updateProduct);

// Delete a product
router.delete("/:productId", productController.deleteProduct);


module.exports = router;
