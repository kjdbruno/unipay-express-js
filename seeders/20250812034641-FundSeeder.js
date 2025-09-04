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
   await queryInterface.bulkInsert('Funds', [
      { Name: 'General Fund', CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'General Fund - TRUST', CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'Special Education Fund', CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'TRUST Fund', CreatedAt: new Date(), UpdatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Funds', null, {});
  }
};
