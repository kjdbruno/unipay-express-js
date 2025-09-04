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
   await queryInterface.bulkInsert('PaymentReceipts', [
      { Name: 'BIR Form #0016', CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'BIR Form #0017', CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'Accountable Form #51', CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'Accountable Form #53', CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'Accountable Form #56', CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'Accountable Form #58', CreatedAt: new Date(), UpdatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('PaymentReceipts', null, {});
  }
};
