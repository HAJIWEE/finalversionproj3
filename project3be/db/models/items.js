"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  items.init(
    {
      Description: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      seller: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "items",
    }
  );
  return items;
};
