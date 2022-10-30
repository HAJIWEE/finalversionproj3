"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class listing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Users, { through: "itemsforsale" });
    }
  }
  listing.init(
    {
      itemName: DataTypes.STRING,
      itemPrice: DataTypes.DOUBLE,
      itemDescription: DataTypes.STRING,
      itemImageUrl: DataTypes.STRING,
      itemSalesStatus: DataTypes.STRING,
      sellerUserID: DataTypes.STRING,
      sellerUserName: DataTypes.STRING,
      sellerdpURL: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "listing",
    }
  );
  return listing;
};
