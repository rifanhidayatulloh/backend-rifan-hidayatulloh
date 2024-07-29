"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, { as: "customer", foreignKey: "customerId" });
      Order.belongsTo(models.Product, { foreignKey: "productId" });
    }
  }
  Order.init(
    {
      customerId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      freeShipping: DataTypes.BOOLEAN,
      discount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
