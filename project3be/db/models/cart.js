"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cart.init(
    {
      cartID: DataTypes.STRING,
      itemId: {
        type: DataTypes.STRING,
      },
      itemName: {
        type: DataTypes.STRING,
      },
      itemPrice: {
        type: DataTypes.STRING,
      },
      sellerUserName: {
        type: DataTypes.STRING,
      },
      buyerUserName: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "cart",
    }
  );
  return cart;
};
