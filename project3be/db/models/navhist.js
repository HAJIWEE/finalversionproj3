"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class navhist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  navhist.init(
    {
      date: DataTypes.STRING,
      location: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "navhists",
    }
  );
  return navhist;
};
