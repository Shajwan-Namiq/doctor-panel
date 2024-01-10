const express = require("express");
const router = express.Router();
const categoryController = require("../controller/category.controller");

// Create a new category
router.post("/", categoryController.createCategory);

// Get a single category
router.get("/", categoryController.getAllCategories);

// Get a single category
router.get("/:categoryId", categoryController.getCategory);

// Update a category
router.put("/:categoryId", categoryController.updateCategory);

// Delete a category
router.delete("/:categoryId", categoryController.deleteCategory);

module.exports = router;
