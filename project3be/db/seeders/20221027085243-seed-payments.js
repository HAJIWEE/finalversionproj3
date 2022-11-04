"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "payments",
      [
        {
          userEmail: "manfred@mail.com",
          cart_id: 1123,
          monthly_amount: 374.33,
          cart_value: 300,
          instalment_period: 3,
          full_payment: "false",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
