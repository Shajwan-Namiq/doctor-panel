const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/product.routes");
const categoryRoutes = require("./routes/category.routes");

require("dotenv").config();

const app = express();

app.use(express.json());

app.use("/api/v2/products", productRoutes);
app.use("/api/v2/categories", categoryRoutes);



mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

module.exports = app;
