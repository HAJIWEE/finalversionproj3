"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Users.init(
    {
      user_id: {
        type: DataTypes.STRING,
        autoIncrement: false,
        primaryKey: true,
      },
      username: DataTypes.STRING,
      dpurl: DataTypes.STRING,
      role: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
