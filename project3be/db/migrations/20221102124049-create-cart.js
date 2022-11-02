"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("carts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cartID: {
        type: Sequelize.STRING,
        unique: true,
      },
      itemId: {
        type: Sequelize.INTEGER,
        references: { model: "listings", key: "id" },
      },
      itemName: {
        type: Sequelize.STRING,
      },
      itemPrice: {
        type: Sequelize.STRING,
      },
      sellerUserName: {
        type: Sequelize.STRING,
        references: { model: "Users", key: "user_id" },
      },
      buyerUserName: {
        type: Sequelize.STRING,
        references: { model: "Users", key: "user_id" },
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
    await queryInterface.dropTable("carts");
  },
};
