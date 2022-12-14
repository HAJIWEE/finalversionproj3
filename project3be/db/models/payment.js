"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  payment.init(
    {
      userEmail: DataTypes.STRING,
      cart_id: DataTypes.STRING,
      cart_value: DataTypes.DOUBLE,
      instalment_period: DataTypes.INTEGER,
      monthly_amount: DataTypes.DOUBLE,
      full_payment: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "payments",
    }
  );
  return payment;
};
