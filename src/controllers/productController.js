const { Product } = require("../models");

exports.createProduct = async (req, res) => {
  const { name, price } = req.body;
  const merchantId = req.user.id;

  try {
    const product = await Product.create({ name, price, merchantId });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
