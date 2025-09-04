'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Windows', [
      { Name: 'Window 1', Description: "N/A", CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'Window 2', Description: "N/A", CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'Window 3', Description: "N/A", CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'Window 4', Description: "N/A", CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'Window 5', Description: "N/A", CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'Window 6', Description: "N/A", CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'Window 7', Description: "N/A", CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'Window 8', Description: "N/A", CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'Window 9', Description: "N/A", CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'Window 10', Description: "N/A", CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'Window 11', Description: "N/A", CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'Window 12', Description: "N/A", CreatedAt: new Date(), UpdatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Windows', null, {});
  }
};
