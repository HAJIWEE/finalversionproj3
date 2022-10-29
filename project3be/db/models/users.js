"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.listing, { through: "itemsforsale" });
    }
  }
  Users.init(
    {
      user_id: DataTypes.UUID,
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
