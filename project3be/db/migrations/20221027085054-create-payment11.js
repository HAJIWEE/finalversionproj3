"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("payments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userEmail: {
        type: Sequelize.STRING,
      },
      cart_id: {
        type: Sequelize.INTEGER,
        unique: true,
      },
      cart_value: {
        type: Sequelize.INTEGER,
      },
      instalment_period: {
        type: Sequelize.INTEGER,
      },
      monthly_amount: {
        type: Sequelize.DOUBLE,
      },
      full_payment: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("payments");
  },
};
