const { Order, Product, User } = require("../models");

exports.createOrder = async (req, res) => {
  const { productId, quantity } = req.body;
  const customerId = req.user.id;

  try {
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).send("Product not found");

    const total = product.price * quantity;
    const freeShipping = total > 15000;
    const discount = total > 50000 ? total * 0.1 : 0;

    const order = await Order.create({
      customerId,
      productId,
      quantity,
      total: total - discount,
      freeShipping,
      discount,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listOrders = async (req, res) => {
  try {
    // Mendapatkan merchantId dari token JWT
    const merchantId = req.user.id;

    // Mendapatkan semua produk yang dimiliki oleh merchant
    const products = await Product.findAll({
      where: { merchantId },
    });

    // Mendapatkan productId dari produk yang dimiliki oleh merchant
    const productIds = products.map((product) => product.id);

    // Mendapatkan semua pesanan yang memiliki productId yang sesuai
    const orders = await Order.findAll({
      where: {
        productId: productIds,
      },
      include: [{ model: Product }, { model: User, as: "customer" }],
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
