"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "navhists",
      [
        {
          date: new Date().toLocaleDateString(),
          location: "Home",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          date: new Date().toLocaleDateString(),
          location: "Upload",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          date: new Date().toLocaleDateString(),
          location: "Profile",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("navhists", null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
